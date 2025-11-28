import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DiaryPage() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-primary tracking-tighter">Дневник</h1>
        <p className="text-muted-foreground">Записывайте свои мысли и анализируйте сделки.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Добро пожаловать в Дневник!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Этот раздел находится в разработке. Здесь вы сможете вести журнал своих сделок и мыслей.</p>
        </CardContent>
      </Card>
    </div>
  );
}
