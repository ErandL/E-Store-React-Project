declare module '@glidejs/glide' {
    interface GlideOptions {
      type?: 'carousel' | 'slider';
      startAt?: number;
      perView?: number;
      focusAt?: number | 'center';
      gap?: number;
      autoplay?: number | boolean;
      hoverpause?: boolean;
      keyboard?: boolean;
      bound?: boolean;
      swipeThreshold?: number | boolean;
      dragThreshold?: number | boolean;
      perTouch?: number | boolean;
      touchRatio?: number;
      touchAngle?: number;
      animationDuration?: number;
      rewind?: boolean;
      rewindDuration?: number;
      animationTimingFunc?: string;
      direction?: 'ltr' | 'rtl';
      peek?: number | { before?: number; after?: number };
      breakpoints?: Record<number, Partial<Omit<GlideOptions, 'breakpoints'>>>;
    }
  
    class Glide {
      constructor(selector: string | HTMLElement, options?: GlideOptions);
      mount(): this;
      destroy(): void;
      go(pattern: string | number): void;
      update(settings?: Partial<GlideOptions>): this;
      on(event: string, callback: () => void): void;
      off(event: string, callback?: () => void): void;
    }
  
    export default Glide;
  }