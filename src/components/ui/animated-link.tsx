'use client';

import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './animated-button';

export interface AnimatedLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  href: string;
}

const AnimatedLink = React.forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  ({ className, variant, size, fullWidth, withArrow, shimmer, children, href, ...props }, ref) => {
    return (
      <Link
        className={cn(buttonVariants({ variant, size, fullWidth, withArrow, shimmer }), className)}
        ref={ref}
        href={href}
        {...props}
      >
        <span className="z-10 flex items-center justify-center">
          {children}
          {withArrow && (
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      </Link>
    );
  }
);

AnimatedLink.displayName = 'AnimatedLink';

export { AnimatedLink };
