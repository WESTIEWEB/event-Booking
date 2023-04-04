export interface IHtmlEmailTemplateService {
  render<T = any>(template: string, context: T): Promise<string>;
}
