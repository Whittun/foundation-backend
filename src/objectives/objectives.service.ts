import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ObjectiveNodeEntity } from './entities/objective-node.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ObjectiveEdgeEntity } from './entities/objective-edge.entity';
import { ObjectiveGraphEntity } from './entities/objective-graph.entity';
import { SaveObjectivesGraphDto } from './dto/save-objective-graph.dto';
import { SaveObjectiveNodeDto } from './dto/save-objective-node.dto';
import { SaveObjectiveEdgeDto } from './dto/save-objective-edge.dto';

@Injectable()
export class ObjectivesService {
  constructor(
    @InjectRepository(ObjectiveNodeEntity)
    private readonly objectiveNodeRepo: Repository<ObjectiveNodeEntity>,

    @InjectRepository(ObjectiveEdgeEntity)
    private readonly objectiveEdgeRepo: Repository<ObjectiveEdgeEntity>,

    @InjectRepository(ObjectiveGraphEntity)
    private readonly objectiveGraphRepo: Repository<ObjectiveGraphEntity>,

    private readonly dataSource: DataSource,
  ) {}

  private async getOrCreateGraph(userId: number) {
    const graph = await this.objectiveGraphRepo.findOne({
      where: {
        userId,
      },
    });

    if (!graph) {
      const newGraph = this.objectiveGraphRepo.create({
        userId,
      });

      const createdGraph = await this.objectiveGraphRepo.save(newGraph);

      return createdGraph;
    }

    return graph;
  }

  private mapNodeEntityToFlowNode(nodeEntity: ObjectiveNodeEntity) {
    return {
      id: nodeEntity.id,
      type: nodeEntity.type,
      position: {
        x: nodeEntity.positionX,
        y: nodeEntity.positionY,
      },
      data: {
        label: nodeEntity.label,
        completed: nodeEntity.completed,
      },
    };
  }

  private mapEdgeEntityToFlowEdge(edgeEntity: ObjectiveEdgeEntity) {
    return {
      id: edgeEntity.id,
      source: edgeEntity.sourceNodeId,
      target: edgeEntity.targetNodeId,
    };
  }

  private mapNodeDtoToEntityData(nodeDto: SaveObjectiveNodeDto, graphId: number, userId: number) {
    return {
      id: nodeDto.id,
      graphId,
      userId,
      type: nodeDto.type,
      positionX: nodeDto.position.x,
      positionY: nodeDto.position.y,
      label: nodeDto.data.label,
      completed: nodeDto.data.completed,
    };
  }

  private mapEdgeDtoToEntityData(edgeDto: SaveObjectiveEdgeDto, graphId: number, userId: number) {
    return {
      id: edgeDto.id,
      graphId,
      userId,
      sourceNodeId: edgeDto.source,
      targetNodeId: edgeDto.target,
    };
  }

  private validateEdgesBelongToNodes(objectiveGraphDto: SaveObjectivesGraphDto) {
    const nodeIds = objectiveGraphDto.nodes.map((node) => node.id);

    const nodeIdsSet = new Set(nodeIds);

    const isValid = objectiveGraphDto.edges.every((edge) => {
      return nodeIdsSet.has(edge.source) && nodeIdsSet.has(edge.target);
    });

    if (!isValid) {
      throw new BadRequestException('Edge references a node that does not exist in the graph');
    }
  }

  async getGraph() {
    const userId = 1;

    const graph = await this.getOrCreateGraph(userId);

    const nodes = await this.objectiveNodeRepo.find({
      where: {
        graphId: graph.id,
      },
    });

    const edges = await this.objectiveEdgeRepo.find({
      where: {
        graphId: graph.id,
      },
    });

    return {
      version: graph.version,
      nodes: nodes.map((node) => this.mapNodeEntityToFlowNode(node)),
      edges: edges.map((edge) => this.mapEdgeEntityToFlowEdge(edge)),
    };
  }

  async saveGraph(objectiveGraphDto: SaveObjectivesGraphDto) {
    const userId = 1;

    const graph = await this.getOrCreateGraph(userId);

    if (objectiveGraphDto.version !== graph.version) {
      throw new ConflictException('The versions of the graph do not match');
    }

    this.validateEdgesBelongToNodes(objectiveGraphDto);

    return this.dataSource.transaction(async (manager) => {
      await manager.delete(ObjectiveEdgeEntity, { graphId: graph.id });
      await manager.delete(ObjectiveNodeEntity, { graphId: graph.id });

      const newNodes = objectiveGraphDto.nodes.map((node) =>
        this.mapNodeDtoToEntityData(node, graph.id, userId),
      );

      const savedNodes = await manager.save(ObjectiveNodeEntity, newNodes);

      const newEdges = objectiveGraphDto.edges.map((edge) =>
        this.mapEdgeDtoToEntityData(edge, graph.id, userId),
      );

      const savedEdges = await manager.save(ObjectiveEdgeEntity, newEdges);

      graph.version += 1;

      const savedGraph = await manager.save(ObjectiveGraphEntity, graph);

      return {
        version: savedGraph.version,
        nodes: savedNodes.map((node) => this.mapNodeEntityToFlowNode(node)),
        edges: savedEdges.map((edge) => this.mapEdgeEntityToFlowEdge(edge)),
      };
    });
  }
}
