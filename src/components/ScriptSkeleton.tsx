import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export function ScriptSkeleton() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md mt-2" />
        <Skeleton className="h-4 w-full rounded-md mt-4" />
        <Skeleton className="h-4 w-5/6 rounded-md mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-1/4 mb-4 rounded-md" />
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3 mx-auto rounded-md" />
          <Skeleton className="h-4 w-2/3 mx-auto rounded-md" />
          <Skeleton className="h-4 w-1/2 mx-auto rounded-md" />
          <Skeleton className="h-8 w-full rounded-md mt-4" />
          <Skeleton className="h-6 w-1/3 mx-auto rounded-md" />
          <Skeleton className="h-4 w-3/4 mx-auto rounded-md" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </CardFooter>
    </Card>
  );
}
