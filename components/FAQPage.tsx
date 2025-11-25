import { useState } from "react";
import { Search, ChevronDown, ChevronUp, TrendingUp, ArrowLeft } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  searchCount: number;
}

interface FAQPageProps {
  onBack: () => void;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "Como adicionar um novo contato?",
    answer: "Para adicionar um novo contato, clique no botão de adicionar (+) localizado no canto inferior direito da tela. Preencha as informações solicitadas como nome, telefone e email, e depois clique em salvar.",
    category: "Contatos",
    searchCount: 245,
  },
  {
    id: "2",
    question: "Como editar informações de um contato?",
    answer: "Toque no contato que deseja editar para abrir suas opções. Em seguida, selecione 'Editar' no menu que aparece. Faça as alterações necessárias e clique em salvar.",
    category: "Contatos",
    searchCount: 198,
  },
  {
    id: "3",
    question: "Como excluir um contato?",
    answer: "Para excluir um contato, toque nele para abrir o menu de opções e selecione 'Excluir'. Uma confirmação será solicitada para evitar exclusões acidentais.",
    category: "Contatos",
    searchCount: 167,
  },
  {
    id: "4",
    question: "Como ordenar meus contatos?",
    answer: "No canto superior direito da tela principal, toque no ícone de três pontos. Selecione 'Ordenar A-Z' para ordem alfabética crescente ou 'Ordenar Z-A' para ordem decrescente.",
    category: "Organização",
    searchCount: 142,
  },
  {
    id: "5",
    question: "Posso adicionar uma foto ao contato?",
    answer: "Sim! Ao adicionar ou editar um contato, você verá um campo para adicionar foto. Clique no ícone de câmera para selecionar uma imagem da sua galeria.",
    category: "Contatos",
    searchCount: 128,
  },
  {
    id: "6",
    question: "Como fazer uma ligação diretamente do app?",
    answer: "Toque no contato desejado para abrir o menu de opções e selecione 'Ligar'. O aplicativo de telefone do seu dispositivo será aberto automaticamente com o número do contato.",
    category: "Funcionalidades",
    searchCount: 115,
  },
  {
    id: "7",
    question: "Os contatos são salvos automaticamente?",
    answer: "Sim, todos os contatos são salvos automaticamente no armazenamento local do seu navegador. Eles permanecerão disponíveis mesmo após fechar o aplicativo.",
    category: "Armazenamento",
    searchCount: 98,
  },
  {
    id: "8",
    question: "Como buscar um contato específico?",
    answer: "Use a barra de busca no topo da lista de contatos para encontrar rapidamente um contato pelo nome, telefone ou email.",
    category: "Organização",
    searchCount: 87,
  },
  {
    id: "9",
    question: "Posso exportar meus contatos?",
    answer: "No momento, a funcionalidade de exportação está em desenvolvimento. Em breve você poderá exportar seus contatos em diversos formatos.",
    category: "Funcionalidades",
    searchCount: 76,
  },
  {
    id: "10",
    question: "O app funciona offline?",
    answer: "Sim! Como os contatos são armazenados localmente, você pode visualizar e editar seus contatos mesmo sem conexão com a internet.",
    category: "Funcionalidades",
    searchCount: 64,
  },
  {
    id: "11",
    question: "Como alterar as configurações do app?",
    answer: "Abra o menu lateral clicando no ícone de menu no canto superior esquerdo e selecione 'Configurações' para acessar as opções disponíveis.",
    category: "Configurações",
    searchCount: 52,
  },
  {
    id: "12",
    question: "Há limite de contatos que posso adicionar?",
    answer: "O limite depende do armazenamento disponível no seu navegador, mas você pode adicionar milhares de contatos sem problemas de desempenho.",
    category: "Armazenamento",
    searchCount: 45,
  },
];

export function FAQPage({ onBack }: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  // Get top 5 most searched topics
  const topSearched = [...faqData]
    .sort((a, b) => b.searchCount - a.searchCount)
    .slice(0, 5);

  // Filter FAQs based on search query
  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* AppBar */}
      <div
        className="text-primary-foreground p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm"
        style={{
          backgroundColor: "var(--primary)",
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          style={{
            color: "var(--primary-foreground)",
          }}
          className="hover:bg-primary-foreground/20"
        >
          <ArrowLeft className="size-6" />
        </Button>
        <h1
          style={{
            color: "var(--primary-foreground)",
            fontFamily: "var(--font-family-poppins)",
            fontSize: "var(--text-2xl)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          FAQ - Perguntas Frequentes
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5"
              style={{ color: "var(--muted-foreground)" }}
            />
            <Input
              type="text"
              placeholder="Buscar dúvidas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              style={{
                backgroundColor: "var(--input-background)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius)",
                color: "var(--foreground)",
              }}
            />
          </div>
        </div>

        {/* Most Searched Topics */}
        {!searchQuery && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp
                className="size-5"
                style={{ color: "var(--accent)" }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-family-poppins)",
                  fontSize: "var(--text-xl)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--foreground)",
                }}
              >
                Tópicos Mais Pesquisados
              </h2>
            </div>
            <div className="grid gap-3">
              {topSearched.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSearchQuery(item.question);
                    setOpenItems([item.id]);
                  }}
                  className="p-4 text-left transition-all hover:shadow-md"
                  style={{
                    backgroundColor: "var(--card)",
                    borderRadius: "var(--radius-card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: "var(--accent)",
                        color: "var(--accent-foreground)",
                        fontFamily: "var(--font-family-poppins)",
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-weight-semibold)",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p
                        style={{
                          fontFamily: "var(--font-family-poppins)",
                          fontSize: "var(--text-base)",
                          fontWeight: "var(--font-weight-regular)",
                          color: "var(--foreground)",
                        }}
                      >
                        {item.question}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="caption"
                          style={{
                            color: "var(--muted-foreground)",
                          }}
                        >
                          {item.category}
                        </span>
                        <span
                          className="caption"
                          style={{
                            color: "var(--muted-foreground)",
                          }}
                        >
                          • {item.searchCount} buscas
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAQ List */}
        <div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-family-poppins)",
              fontSize: "var(--text-xl)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--foreground)",
            }}
          >
            {searchQuery ? "Resultados da Busca" : "Todas as Perguntas"}
          </h2>
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p
                style={{
                  fontFamily: "var(--font-family-source-sans)",
                  fontSize: "var(--text-base)",
                  color: "var(--muted-foreground)",
                }}
              >
                Nenhuma pergunta encontrada para "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {filteredFAQs.map((item) => (
                <Collapsible
                  key={item.id}
                  open={openItems.includes(item.id)}
                  onOpenChange={() => toggleItem(item.id)}
                >
                  <div
                    className="overflow-hidden"
                    style={{
                      backgroundColor: "var(--card)",
                      borderRadius: "var(--radius-card)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <CollapsibleTrigger asChild>
                      <button className="w-full p-4 flex items-center justify-between gap-3 hover:bg-muted/50 transition-colors">
                        <div className="flex-1 text-left">
                          <p
                            style={{
                              fontFamily: "var(--font-family-poppins)",
                              fontSize: "var(--text-base)",
                              fontWeight: "var(--font-weight-semibold)",
                              color: "var(--foreground)",
                            }}
                          >
                            {item.question}
                          </p>
                          <span
                            className="caption mt-1"
                            style={{
                              color: "var(--muted-foreground)",
                            }}
                          >
                            {item.category}
                          </span>
                        </div>
                        <div
                          className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: "var(--muted)",
                            color: "var(--muted-foreground)",
                          }}
                        >
                          {openItems.includes(item.id) ? (
                            <ChevronUp className="size-5" />
                          ) : (
                            <ChevronDown className="size-5" />
                          )}
                        </div>
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div
                        className="px-4 pb-4 pt-2"
                        style={{
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-family-source-sans)",
                            fontSize: "var(--text-base)",
                            fontWeight: "var(--font-weight-regular)",
                            color: "var(--card-foreground)",
                            lineHeight: "1.6",
                          }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
