import styles from "./blog.module.css";
import { posts } from '@/lib/blog-data';

export default function BlogPage() {
  return (
   <div className={styles.blogWrapper}>
  <div className={styles.container}>
    <header className={styles.blogHeader}>
      <h1>Creator <span>Resources</span></h1>
      <p>Tips, tricks and guides to help you become a pro in front of the camera</p>
    </header>
    <main>
    <div className={styles.postGrid}>
      {posts.map((post) => (
        <a href={`/blog/${post.slug}`} className={styles.postCard} key={post.slug}>
          <div className={styles.iconBox}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM15 10a5 5 0 11-10 0 5 5 0 0110 0z"></path></svg>
          </div>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <span className={styles.readMore}>5 min read</span>
        </a>
      ))}
    </div>
    </main>
  </div>
</div>
  );
}

