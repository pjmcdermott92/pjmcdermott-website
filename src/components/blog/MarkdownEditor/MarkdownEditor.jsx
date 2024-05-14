/**
 * See https://github.com/remarkjs/react-markdown
 */

import 'github-markdown-css/github-markdown.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './MarkdownEditor.css';

export default function MarkdownEditor({ defaultValue = '' }) {
    const [markdown, setMarkdown] = useState(defaultValue);

    return (
        <div className='markdown-editor'>
            <div className='markdown-editor__header'>
                <div className='markdown-editor__header--heading'>Markdown Editor</div>
            </div>

            <div className='markdown-editor__editor'>
                <div className='markdown-editor__editor--textarea'>
                    <textarea value={markdown} onChange={e => setMarkdown(e.target.value)} />
                </div>
                <div className='markdown-body'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
