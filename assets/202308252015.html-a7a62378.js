import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as n,f as a}from"./app-df65aacd.js";const i={},t=a(`<h1 id="密钥" tabindex="-1"><a class="header-anchor" href="#密钥" aria-hidden="true">#</a> 密钥</h1><p>在一台电脑上需要处理不同的项目，如果项目代码存放在不同的代码账户中，就需要生成多个公钥关联不同的账户</p><h2 id="如何生成公钥" tabindex="-1"><a class="header-anchor" href="#如何生成公钥" aria-hidden="true">#</a> 如何生成公钥</h2><p>生成公钥的命令形式如下所示：</p><blockquote><p>ssh-keygen -t rsa -C &quot;<a href="mailto:your_email@example.com">your_email@example.com</a>&quot; -f ~/.ssh/pubkey</p></blockquote><p>代码参数含义：</p><p>-t 指定密钥类型，默认是 rsa ，可以省略。</p><p>-C 设置注释文字，比如邮箱。</p><p>-f 指定密钥文件存储文件名。</p><blockquote><p>ssh-keygen</p></blockquote><p>同样可以生成公钥，如果不输入文件名，会使用默认文件名生成 id_rsa 和 id_rsa.pub 两个密钥文件。</p><h2 id="多个公钥关联不同账户" tabindex="-1"><a class="header-anchor" href="#多个公钥关联不同账户" aria-hidden="true">#</a> 多个公钥关联不同账户</h2><h3 id="为了更好地演示多个公钥关联不同的代码账户-我们需要生成两个公钥分别关联不同的账户为例进行介绍" tabindex="-1"><a class="header-anchor" href="#为了更好地演示多个公钥关联不同的代码账户-我们需要生成两个公钥分别关联不同的账户为例进行介绍" aria-hidden="true">#</a> 为了更好地演示多个公钥关联不同的代码账户，我们需要生成两个公钥分别关联不同的账户为例进行介绍</h3><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>ssh-keygen -t rsa -C &quot;your_email1@example.com&quot; -f ~/.ssh/pubkey1
ssh-keygen -t rsa -C &quot;your_email2@example.com&quot; -f ~/.ssh/pubkey2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>或者</p><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>ssh-keygen -f ~/.ssh/pubkey1
ssh-keygen -f ~/.ssh/pubkey2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>（如果提示.ssh文件夹不存在，可以在用户文件夹下创建一个名为.ssh的文件夹）</p><ul><li>此时在.ssh文件夹会生成pubkey1、pubkey1.pub、pubkey2和pubkey2.pub四个文件</li></ul><h3 id="代码账户说明" tabindex="-1"><a class="header-anchor" href="#代码账户说明" aria-hidden="true">#</a> 代码账户说明</h3><p>代码仓库提供的ssh克隆形式如下：</p><blockquote><p><a href="mailto:git@gitee.com">git@gitee.com</a>:XXX/xxx.git # 码云<br><a href="mailto:git@github.com">git@github.com</a>:XXX/xxx.git # github</p></blockquote><p>XXX是账户名，xxx是仓库名，git@gitee.com 类似于标识信息</p><ul><li>假设公钥pubkey1关联账户USER1：git@gitee.com:USER1/usercode1.git，公钥pubkey2关联账户USER2：git@gitee.com:USER2/apps.git (此处表达还不够清楚)</li></ul><h3 id="如何配置并使用" tabindex="-1"><a class="header-anchor" href="#如何配置并使用" aria-hidden="true">#</a> 如何配置并使用</h3><h4 id="方案1" tabindex="-1"><a class="header-anchor" href="#方案1" aria-hidden="true">#</a> 方案1</h4><p>在.ssh文件夹新建config文件，无需后缀，配置文件内容如下</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># pubkey1</span>
HOST pubKey1
HostName gitee<span class="token punctuation">.</span>com
User git
IdentityFile <span class="token operator">~</span><span class="token operator">/</span><span class="token punctuation">.</span>ssh<span class="token operator">/</span>pubkey1

<span class="token comment"># pubkey2</span>
HOST pubKey2
HostName gitee<span class="token punctuation">.</span>com
User git
IdentityFile <span class="token operator">~</span><span class="token operator">/</span><span class="token punctuation">.</span>ssh<span class="token operator">/</span>pubkey2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>克隆USER1账户下的usercode1仓库</p><blockquote><p>git clone pubKey1:USER1/usercode1.git</p></blockquote><p>克隆USER2账户下的apps仓库</p><blockquote><p>git clone pubKey2:USER2/apps.git</p></blockquote><ul><li>操作USER1账户下的usercode1仓库</li></ul><blockquote><p>git clone pubKey1:USER1/usercode1.git<br> cd usercode1<br> 修改文件可以提交<br> git add .<br> git commit -m &quot;修改后并提交&quot;<br> git push</p></blockquote><p>在空文件夹app1下关联USER1账户下的usercode1仓库</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir app1
cd app1
git init
git remote add origin pubKey1:USER1/usercode1.git
git pull origin master
git add .
git commit -m &quot;修改后提交&quot;
git push origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h4 id="方案2" tabindex="-1"><a class="header-anchor" href="#方案2" aria-hidden="true">#</a> 方案2</h4><p>在.ssh文件夹新建config文件，无需后缀，配置文件内容如下</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># config配置文件</span>

<span class="token comment"># pubkey1</span>
Host USER1<span class="token punctuation">.</span>gitee<span class="token punctuation">.</span>com
HostName gitee<span class="token punctuation">.</span>com
PreferredAuthentications publickey
IdentityFile <span class="token operator">~</span><span class="token operator">/</span><span class="token punctuation">.</span>ssh<span class="token operator">/</span>pubkey1
User USER1

<span class="token comment"># pubkey2</span>
Host USER2<span class="token punctuation">.</span>gitee<span class="token punctuation">.</span>com
HostName gitee<span class="token punctuation">.</span>com
PreferredAuthentications publickey
IdentityFile <span class="token operator">~</span><span class="token operator">/</span><span class="token punctuation">.</span>ssh<span class="token operator">/</span>pubkey2
User USER2    

<span class="token comment"># 配置文件参数</span>
<span class="token comment"># Host : Host可以看作是一个你要识别的模式，对识别的模式，进行配置对应的的主机名和ssh文件</span>
<span class="token comment"># HostName : 要登录主机的主机名</span>
<span class="token comment"># User : 登录名</span>
<span class="token comment"># IdentityFile : 指明上面User对应的identityFile路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>克隆USER1账户下的usercode1仓库</p><blockquote><p>git clone <a href="mailto:git@USER1.github.com">git@USER1.github.com</a>:USER1/usercode1.git</p></blockquote><p>克隆USER2账户下的apps仓库</p><blockquote><p>git clone <a href="mailto:git@USER2.github.com">git@USER2.github.com</a>:USER2/apps.git</p></blockquote><ul><li>操作USER1账户下的usercode1仓库</li></ul><blockquote><p>git clone <a href="mailto:git@USER1.github.com">git@USER1.github.com</a>:USER1/usercode1.git<br> cd usercode1<br> 修改文件可以提交<br> git add .<br> git commit -m &quot;修改后并提交&quot;<br> git push</p></blockquote>`,45),o=[t];function l(c,d){return s(),n("div",null,o)}const u=e(i,[["render",l],["__file","202308252015.html.vue"]]);export{u as default};
