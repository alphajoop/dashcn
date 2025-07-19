import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatFCFA } from '@/lib/utils';

interface CardStatProps {
  title: string;
  value: string | number;
  isCurrency?: boolean;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
}

export default function CardStat({
  title,
  value,
  isCurrency = false,
  change,
  trend = 'neutral',
  icon: Icon,
}: CardStatProps) {
  return (
    <Card className="bg-card text-card-foreground shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="bg-primary/10 text-primary rounded-full p-2">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isCurrency && typeof value === 'number' ? formatFCFA(value) : value}
        </div>
        {change && (
          <p
            className={cn(
              'mt-1 text-xs',
              trend === 'up' && 'text-green-600 dark:text-green-500',
              trend === 'down' && 'text-red-600 dark:text-red-500',
              trend === 'neutral' && 'text-muted-foreground',
            )}
          >
            {change} depuis le mois dernier
          </p>
        )}
      </CardContent>
    </Card>
  );
}
