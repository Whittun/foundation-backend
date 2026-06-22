import { IsTiptapDocJson } from 'src/shared/validators/is-tiptap-doc-json.validator';

export class SetDayNoteDto {
  @IsTiptapDocJson()
  contentJson!: Record<string, unknown>;
}
