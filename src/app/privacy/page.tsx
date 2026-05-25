import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">隐私政策</h1>

      <div className="space-y-6 text-sm text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">信息收集</h2>
          <p>本站仅收集您主动提供的信息（如注册账号、发布资源时输入的内容）。我们不会收集您的浏览记录、位置信息等个人隐私数据。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">信息使用</h2>
          <p>您提供的信息仅用于：提供网站服务、改进用户体验、处理侵权投诉。我们不会将您的个人信息出售或提供给第三方。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2"> Cookies</h2>
          <p>本站使用 cookies 来维持您的登录状态。如您不同意使用 cookies，可通过浏览器设置关闭。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">联系我们</h2>
          <p>如您对隐私政策有任何疑问，请联系：<a href="mailto:kokfam168@gmail.com" className="text-primary hover:underline">kokfam168@gmail.com</a></p>
        </section>
      </div>

      <div className="mt-8 pt-6 border-t">
        <Link href="/" className="text-sm text-primary hover:underline">&larr; 返回首页</Link>
      </div>
    </div>
  )
}