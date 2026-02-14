import { posts } from '@/lib/blog-data';
import styles from './slug.module.css';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article className={styles.articleContainer}>
      <header>
        <span className={styles.date}>{post.date}</span>
        <h1 className={styles.title}>{post.title}</h1>
      </header>

      {/* IMPORTANTE: El div debe estar vacío en el código 
         y se llena SOLO con dangerouslySetInnerHTML. 
         No pongas nada dentro de las etiquetas <div></div>.
      */}
      <div 
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />

      <div className={styles.ctaBox}>
        <h2>Want to record like a pro?</h2>
        <a href="/app" className={styles.ctaButton}>Try Prompterio</a>
      </div>
    </article>
  );
}