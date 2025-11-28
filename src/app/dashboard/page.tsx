import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-primary tracking-tighter">Dashboard</h1>
        <p className="text-muted-foreground">Обзор вашей производительности.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Добро пожаловать!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Этот раздел находится в разработке. Здесь будет отображаться ваша статистика и прогресс.</p>
        </CardContent>
      </Card>
    </div>
  );
}
