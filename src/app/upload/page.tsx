'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Plus, Trash2, ArrowLeft, Upload } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/auth'
import { Category, Platform, CATEGORY_NAMES, CATEGORIES } from '@/types/database'
import { PLATFORM_NAMES } from '@/lib/constants'

interface PanLinkInput {
  platform: Platform
  url: string
  password: string
}

export default function UploadPage() {
  const router = useRouter()
  const { user, profile } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category>('movie')
  const [coverUrl, setCoverUrl] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [panLinks, setPanLinks] = useState<PanLinkInput[]>([
    { platform: 'quark', url: '', password: '' },
  ])

  const isAdmin = profile?.role === 'admin'

  if (!user) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">请先登录</h1>
          <p className="text-muted-foreground mb-4">登录后才能发布资源</p>
          <Button render={<Link href="/login">去登录</Link>} />
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">权限不足</h1>
          <p className="text-muted-foreground mb-4">
            只有管理员才能发布资源
          </p>
          <Button render={<Link href="/">返回首页</Link>} />
        </div>
      </div>
    )
  }

  const addPanLink = () => {
    setPanLinks([...panLinks, { platform: 'quark', url: '', password: '' }])
  }

  const removePanLink = (index: number) => {
    setPanLinks(panLinks.filter((_, i) => i !== index))
  }

  const updatePanLink = (index: number, field: keyof PanLinkInput, value: any) => {
    const newLinks = [...panLinks]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setPanLinks(newLinks)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error('请输入资源标题')
      return
    }

    const validLinks = panLinks.filter((link) => link.url.trim())
    if (validLinks.length === 0) {
      toast.error('请至少添加一个网盘链接')
      return
    }

    setLoading(true)

    try {
      // 创建资源
      const { data: resource, error: resourceError } = await supabase
        .from('resources')
        .insert({
          category,
          title: title.trim(),
          cover_url: coverUrl.trim() || null,
          description: description.trim() || null,
          tags: tags
            .split(/[,，]/)
            .map((t) => t.trim())
            .filter(Boolean),
          status: 'approved', // 开发者发布直接审核通过
          uploader_id: user.id,
        })
        .select()
        .single()

      if (resourceError) throw resourceError

      // 创建网盘链接
      const linksToInsert = validLinks.map((link, index) => ({
        resource_id: resource.id,
        platform: link.platform,
        url: link.url.trim(),
        password: link.password.trim() || null,
        sort_order: index,
      }))

      const { error: linksError } = await supabase.from('pan_links').insert(linksToInsert)

      if (linksError) throw linksError

      toast.success('资源发布成功！')

      // 跳转到资源详情页
      router.push(`/${category}s/${resource.id}`)
    } catch (error: any) {
      toast.error(error.message || '发布失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              发布资源
            </CardTitle>
            <CardDescription>
              分享你的网盘资源，让更多人受益
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  资源标题 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="输入资源名称"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  分类 <span className="text-destructive">*</span>
                </Label>
                <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {CATEGORY_NAMES[cat]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cover URL */}
              <div className="space-y-2">
                <Label htmlFor="cover">封面图片 URL</Label>
                <Input
                  id="cover"
                  type="url"
                  placeholder="https://example.com/cover.jpg"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  输入图片链接地址，建议使用图床
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">简介</Label>
                <textarea
                  id="description"
                  className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="描述资源的详细信息..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">标签</Label>
                <Input
                  id="tags"
                  placeholder="标签用逗号分隔，如：仙侠,完本,高清"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  多个标签用逗号分隔，便于用户筛选
                </p>
              </div>

              {/* Pan Links */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>
                    网盘链接 <span className="text-destructive">*</span>
                  </Label>
                  <Button type="button" variant="outline" size="sm" onClick={addPanLink}>
                    <Plus className="h-4 w-4 mr-1" />
                    添加链接
                  </Button>
                </div>

                <div className="space-y-3">
                  {panLinks.map((link, index) => (
                    <Card key={index} className="p-4">
                      <div className="grid gap-3">
                        <div className="flex gap-2">
                          <Select
                            value={link.platform}
                            onValueChange={(v) => updatePanLink(index, 'platform', v)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="quark">夸克网盘</SelectItem>
                              <SelectItem value="baidu">百度网盘</SelectItem>
                              <SelectItem value="uc">UC网盘</SelectItem>
                              <SelectItem value="ali">阿里云盘</SelectItem>
                              <SelectItem value="other">其他</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            placeholder="网盘链接 URL"
                            value={link.url}
                            onChange={(e) => updatePanLink(index, 'url', e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removePanLink(index)}
                            disabled={panLinks.length === 1}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="提取码（选填）"
                            value={link.password}
                            onChange={(e) => updatePanLink(index, 'password', e.target.value)}
                            className="w-32"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? '发布中...' : '发布资源'}
                </Button>
                <Button type="button" variant="outline" size="lg" render={<Link href="/">取消</Link>} />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}