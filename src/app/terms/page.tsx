import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">使用条款</h1>

      <div className="space-y-6 text-sm text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">1. 资源声明</h2>
          <p>本站所有资源均由用户自行上传分享。本站不存储、不制作、不传播任何资源文件。所有资源链接均指向第三方网盘（如夸克网盘、百度网盘、阿里云盘等），用户需自行判断内容安全性及合法性。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">2. 用户行为规范</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>禁止发布任何违反中华人民共和国法律法规的内容</li>
            <li>禁止发布侵权、色情、暴力、赌博、诈骗等内容</li>
            <li>禁止发布受版权保护的影视、软件、书籍等资源（除非获得授权）</li>
            <li>禁止恶意灌水、刷屏、人身攻击、泄露他人隐私</li>
            <li>禁止发布未经批准的广告、外链推广</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">3. 免责声明</h2>
          <p>用户发布的内容仅代表个人观点，本站在法律允许的范围内不对用户发布的内容承担任何直接或间接责任。如您认为本站内容侵犯了您的合法权益，请提供权利证明及侵权链接，发送至 <a href="mailto:kokfam168@gmail.com" className="text-primary hover:underline">kokfam168@gmail.com</a>，我们将在48小时内核实并处理。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">4. 账号管理</h2>
          <p>用户对自己账号的所有行为负全部责任。违反规定的内容将被删除，情节严重的账号将被封禁。本站保留随时修改条款的权利，修改后继续使用即视为接受。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">5. 联系我们</h2>
          <p>侵权投诉及问题反馈：<a href="mailto:kokfam168@gmail.com" className="text-primary hover:underline">kokfam168@gmail.com</a></p>
        </section>
      </div>

      <div className="mt-8 pt-6 border-t">
        <Link href="/" className="text-sm text-primary hover:underline">&larr; 返回首页</Link>
      </div>
    </div>
  )
}