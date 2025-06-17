import {inter} from '@/app/ui/fonts';
import Image from "next/image";
import styles from './home.module.css';

export default function Hero() {
  return (
      <section className={`${inter.className} ${styles.hero}`}>
        <h2>Welcome to Handcrafted Haven</h2>
        <p>Discover a vibrant marketplace where talented creators share their passions through unique, handmade
          goods.</p>
        <p>We connect you directly with the heart of creativity, offering authentic, one-of-a-kind items
          crafted with care. From intricate jewelry to bespoke home decor and personalized gifts, explore a world
          of quality craftsmanship, thoughtfully categorized for easy Browse.</p>
        <a className={'a-button'} href={'/browse'}>Click to get started</a>
        <div className={`${styles['hero-image-wrapper']}`}>
          <Image src="/images/hero_large.webp" alt="Handcrafted Haven" width={430} height={287} priority/>
        </div>
      </section>
  );
}
