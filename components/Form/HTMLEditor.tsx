import { FC } from 'react';
import {
  AudioTool,
  CopyMarkdownTool,
  Editor,
  EditorProps,
  IFrameTool,
  OriginalTools,
  VideoTool,
} from 'react-bootstrap-editor';
import { Constructor } from 'web-utility';

const ExcludeTools = [IFrameTool, AudioTool, VideoTool];

const CustomTools = OriginalTools.filter(
  Tool => !ExcludeTools.includes(Tool as Constructor<IFrameTool>),
);

export const HTMLEditor: FC<EditorProps> = props => (
  <Editor tools={[...CustomTools, CopyMarkdownTool]} {...props} />
);
