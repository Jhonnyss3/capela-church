import PageLayout from "@/components/PageLayout";

const ComoCremos = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Como Cremos?</h1>
          <div className="prose prose-lg">
            <p className="text-lg text-muted-foreground mb-6">
              Conteúdo sobre as crenças da Capela Church será adicionado aqui.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ComoCremos;