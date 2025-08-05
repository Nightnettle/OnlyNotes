'use client'
import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'

interface CodeBlockProps {
  node: {
    attrs: {
      language: string
    }
  }
  updateAttributes: (attrs: { language: string }) => void
  extension: any
}

const CodeBlockWithLanguageSelector: React.FC<CodeBlockProps> = ({ node, updateAttributes, extension }) => {
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'scss', label: 'SCSS' },
    { value: 'json', label: 'JSON' },
    { value: 'xml', label: 'XML' },
    { value: 'yaml', label: 'YAML' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'sql', label: 'SQL' },
    { value: 'bash', label: 'Bash' },
    { value: 'powershell', label: 'PowerShell' },
    { value: 'dockerfile', label: 'Dockerfile' },
    { value: 'plaintext', label: 'Plain Text' },
  ]

  const currentLanguage = languages.find(lang => lang.value === node.attrs.language) || languages.find(lang => lang.value === 'plaintext')

  return (
    <NodeViewWrapper className="code-block-wrapper">
      <div className="relative">
        <div className="language-selector">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90"
              >
                {currentLanguage?.label || 'Language'}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-60 overflow-y-auto">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.value}
                  onClick={() => updateAttributes({ language: lang.value })}
                  className="text-xs cursor-pointer"
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <pre className="hljs">
          <NodeViewContent as="code" />
        </pre>
      </div>
    </NodeViewWrapper>
  )
}

export default CodeBlockWithLanguageSelector