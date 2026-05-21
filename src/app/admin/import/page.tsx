'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Upload, Download, FileSpreadsheet, AlertCircle, CheckCircle, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { AdminSidebar } from '@/components/admin-sidebar'
import * as XLSX from 'xlsx'

interface ImportRow {
  category: string
  title: string
  cover_url?: string
  description?: string
  tags?: string
  platform: string
  url: string
  password?: string
}

interface ImportResult {
  success: number
  failed: number
  errors: string[]
}

export default function ImportPage() {
  const [uploading, setUploading] = useState(false)
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [previewData, setPreviewData] = useState<ImportRow[]>([])
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setResult(null)

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json<ImportRow>(worksheet)

        // 验证数据格式
        const validData = jsonData.filter((row) => row.title && row.url && row.platform)
        setPreviewData(validData.slice(0, 10)) // 只预览前10条

        if (validData.length === 0) {
          toast.error('文件中没有找到有效数据')
          return
        }

        toast.success(`成功解析 ${validData.length} 条数据`)
      } catch (error) {
        toast.error('文件解析失败')
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const downloadTemplate = () => {
    const template = [
      {
        category: 'movie',
        title: '示例电影名称',
        cover_url: 'https://example.com/cover.jpg',
        description: '电影简介',
        tags: '动作,高清',
        platform: 'baidu',
        url: 'https://pan.baidu.com/s/xxxxx',
        password: '1234',
      },
      {
        category: 'novel',
        title: '示例小说名称',
        cover_url: '',
        description: '小说简介',
        tags: '仙侠,完本',
        platform: 'quark',
        url: 'https://pan.quark.cn/s/xxxxx',
        password: '',
      },
      {
        category: 'game',
        title: '示例游戏名称',
        cover_url: '',
        description: '游戏简介',
        tags: 'RPG',
        platform: 'ali',
        url: 'https://www.aliyundrive.com/s/xxxxx',
        password: '',
      },
    ]

    const ws = XLSX.utils.json_to_sheet(template)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '导入模板')
    XLSX.writeFile(wb, '资源导入模板.xlsx')
  }

  const handleImport = async () => {
    if (previewData.length === 0) {
      toast.error('没有可导入的数据')
      return
    }

    setImporting(true)
    setProgress(0)

    let success = 0
    let failed = 0
    const errors: string[] = []
    const batchSize = 100

    try {
      // 分批导入
      for (let i = 0; i < previewData.length; i += batchSize) {
        const batch = previewData.slice(i, i + batchSize)

        for (const row of batch) {
          try {
            // 转换分类
            const categoryMap: Record<string, string> = {
              movie: 'movie',
              movies: 'movie',
              影视: 'movie',
              novel: 'novel',
              novels: 'novel',
              小说: 'novel',
              game: 'game',
              games: 'game',
              游戏: 'game',
            }
            const category = categoryMap[row.category?.toLowerCase()] || 'movie'

            // 转换平台
            const platformMap: Record<string, string> = {
              quark: 'quark',
              夸克: 'quark',
              baidu: 'baidu',
              百度: 'baidu',
              uc: 'uc',
              阿里: 'ali',
              ali: 'ali',
              aliyun: 'ali',
              other: 'other',
              其他: 'other',
            }
            const platform = platformMap[row.platform?.toLowerCase()] || 'other'

            // 解析标签
            const tags = row.tags
              ? row.tags
                  .split(/[,，]/)
                  .map((t) => t.trim())
                  .filter(Boolean)
              : []

            // 创建资源
            const { data: resource, error: resourceError } = await supabase
              .from('resources')
              .insert({
                category: category as any,
                title: row.title,
                cover_url: row.cover_url || null,
                description: row.description || null,
                tags,
                status: 'approved',
                uploader_id: (await supabase.auth.getUser()).data.user?.id || null,
              })
              .select()
              .single()

            if (resourceError) {
              failed++
              errors.push(`${row.title}: ${resourceError.message}`)
              continue
            }

            // 创建网盘链接
            const { error: linkError } = await supabase.from('pan_links').insert({
              resource_id: resource.id,
              platform: platform as any,
              url: row.url,
              password: row.password || null,
            })

            if (linkError) {
              failed++
              errors.push(`${row.title} (链接): ${linkError.message}`)
            } else {
              success++
            }
          } catch (err: any) {
            failed++
            errors.push(`${row.title}: ${err.message}`)
          }
        }

        setProgress(Math.min(((i + batchSize) / previewData.length) * 100, 100))
      }

      setResult({ success, failed, errors: errors.slice(0, 50) }) // 最多显示50个错误
      toast.success(`导入完成：成功 ${success} 条，失败 ${failed} 条`)
    } catch (error: any) {
      toast.error(error.message || '导入失败')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">数据导入</h1>

          <div className="grid gap-6">
            {/* Template Download */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5" />
                  Excel 导入模板
                </CardTitle>
                <CardDescription>
                  下载模板，填写数据后上传导入
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={downloadTemplate}>
                  <Download className="h-4 w-4 mr-2" />
                  下载导入模板
                </Button>

                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="font-medium mb-2">模板字段说明：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>category</strong> - 分类：movie/movies/影视、novel/novels/小说、game/games/游戏</li>
                    <li><strong>title</strong> - 资源标题（必填）</li>
                    <li><strong>cover_url</strong> - 封面图片链接</li>
                    <li><strong>description</strong> - 资源简介</li>
                    <li><strong>tags</strong> - 标签，多个用逗号分隔</li>
                    <li><strong>platform</strong> - 平台：quark/夸克、baidu/百度、uc/UC、ali/阿里、other/其他</li>
                    <li><strong>url</strong> - 网盘链接（必填）</li>
                    <li><strong>password</strong> - 提取码</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  上传文件
                </CardTitle>
                <CardDescription>
                  支持 .xlsx, .xls, .csv 格式
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                />

                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">
                    {fileName ? fileName : '点击或拖拽文件到此处上传'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    支持 .xlsx, .xls, .csv 格式
                  </p>
                </div>

                {previewData.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">
                      预览（前 10 条，共 {previewData.length} 条）：
                    </p>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-3 py-2 text-left">分类</th>
                            <th className="px-3 py-2 text-left">标题</th>
                            <th className="px-3 py-2 text-left">平台</th>
                            <th className="px-3 py-2 text-left">链接</th>
                          </tr>
                        </thead>
                        <tbody>
                          {previewData.map((row, i) => (
                            <tr key={i} className="border-t">
                              <td className="px-3 py-2">{row.category}</td>
                              <td className="px-3 py-2 truncate max-w-[200px]">{row.title}</td>
                              <td className="px-3 py-2">{row.platform}</td>
                              <td className="px-3 py-2 truncate max-w-[150px]">{row.url}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {previewData.length > 0 && (
                  <div className="mt-6">
                    <Button
                      size="lg"
                      onClick={handleImport}
                      disabled={importing}
                    >
                      {importing ? '导入中...' : `开始导入 (${previewData.length} 条)`}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Progress */}
            {importing && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>导入进度</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Result */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {result.failed === 0 ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                    )}
                    导入结果
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    <Badge variant="default" className="text-lg px-4 py-1">
                      成功：{result.success}
                    </Badge>
                    {result.failed > 0 && (
                      <Badge variant="destructive" className="text-lg px-4 py-1">
                        失败：{result.failed}
                      </Badge>
                    )}
                  </div>

                  {result.errors.length > 0 && (
                    <div className="bg-muted rounded-lg p-4 max-h-60 overflow-auto">
                      <p className="font-medium mb-2">错误详情：</p>
                      <ul className="text-sm space-y-1">
                        {result.errors.map((error, i) => (
                          <li key={i} className="text-destructive">
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}