import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import { ExternalLink, Globe, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ListingCardProps {
  id: number;
  website: string;
  domainAuthority: number;
  domainRating: number;
  traffic: string;
  category: string;
  price: string;
  description: string;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  id,
  website,
  domainAuthority,
  domainRating,
  traffic,
  category,
  price,
  description,
}) => {
  return (
    <Card className="flex flex-col h-full border-muted hover:border-accent/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">
            {website}
          </CardTitle>
          <span className="bg-primary text-primary-foreground text-sm font-medium px-2.5 py-0.5 rounded">
            {price}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardHeader>
      <CardContent className="pb-3 pt-0 flex-grow">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Domain Authority</span>
            <div className="flex items-center">
              <Zap className="h-4 w-4 mr-1 text-accent" />
              <span className="font-medium">{domainAuthority}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Domain Rating</span>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-accent" />
              <span className="font-medium">{domainRating}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Monthly Traffic</span>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1 text-accent" />
              <span className="font-medium">{traffic}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Category</span>
            <span className="inline-flex items-center bg-accent/10 text-secondary px-2 py-0.5 text-sm rounded-full">
              {category}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 mt-auto">
        <Link
          href={`/marketplace/${id}`}
          className="w-full inline-flex justify-center items-center h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-secondary transition-colors"
        >
          View Details
          <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}; 