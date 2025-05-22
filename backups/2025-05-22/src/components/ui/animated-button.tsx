'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 overflow-hidden',
  {
    variants: {
      variant: {
        default: [
          'brand-gradient text-white',
          'hover:opacity-95 hover:translate-y-[-2px]',
          'shadow-md hover:shadow-lg hover:shadow-primary/20'
        ],
        secondary: [
          'bg-white text-primary border border-primary',
          'hover:bg-primary/5 hover:translate-y-[-2px]',
          'shadow-sm hover:shadow-md hover:shadow-primary/10'
        ],
        outline: [
          'bg-transparent border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white',
          'hover:border-primary hover:text-primary dark:hover:text-primary',
          'hover:translate-y-[-2px]'
        ],
        ghost: [
          'bg-transparent text-gray-700 dark:text-gray-300',
          'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary'
        ],
        link: [
          'bg-transparent text-primary underline-offset-4 hover:underline',
          'p-0 font-normal'
        ]
      },
      size: {
        default: 'py-2.5 px-5 text-sm',
        sm: 'py-2 px-4 text-xs',
        lg: 'py-3 px-6 text-base',
        xl: 'py-4 px-8 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
      withArrow: {
        true: 'group',
      },
      shimmer: {
        true: 'shine-effect',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
      withArrow: false,
      shimmer: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, withArrow, shimmer, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, withArrow, shimmer }), className)}
        ref={ref}
        {...props}
      >
        <span className="z-10 flex items-center justify-center">
          {children}
          {withArrow && (
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      </button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton, buttonVariants };
