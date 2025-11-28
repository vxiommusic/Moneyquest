import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DiaryPage() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-primary tracking-tighter">Дневник</h1>
        <p className="text-muted-foreground">Записывайте свои мысли и анализируйте сделки.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Информация о сделке</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Здесь будет форма для ввода информации о сделке.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>История сделок</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Здесь будет отображаться история ваших сделок.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
