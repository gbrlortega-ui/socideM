export const clinicaQuestions = [
  {
    id: 1,
    enunciado: "Homem de 85 anos de idade é internado em Unidade de Terapia Intensiva com quadro de pneumonia bacteriana comunitária. O paciente é portador de demência de Alzheimer, hipertensão e diabetes. Na admissão foi evidenciado que o paciente apresentava, há três dias, alteração de comportamento, alternando períodos de agitação com hipoatividade, flutuação do nível de consciência ao longo do dia e déficit de atenção. Qual é o diagnóstico mais provável desse paciente?",
    alternativas: [
      'Depressão maior.',
      'Delirium misto.',
      'Psicose não orgânica.',
      'Evolução da demência.'
    ],
    correta: 1,
    explicacao: "O quadro clínico é compatível com delirium, por apresentar início agudo, evolução flutuante, desatenção e alteração no nível de consciência, sendo a demência de Alzheimer um fator predisponente e a pneumonia um fator desencadeante. A alternância entre agitação (hiperatividade) e hipoatividade define o delirium misto."
  },
  {
    id: 2,
    enunciado: "Mulher de 18 anos de idade queixa-se de perda de peso, palpitações e agitação psicomotora há dois meses. Exame físico: PA = 130 x 60 mmHg, FC = 132 bpm, tremores finos de extremidades e tireoide aumentada difusamente de volume, indolor, com temperatura local elevada e sopro tireoidiano, além de proptose bilateral sem sinais flogísticos oculares. Exames laboratoriais: TSH = 0,01 mcUI/ml; T4 livre = 2,5 ng/dL; T3 = 268 ng/dL. Qual o diagnóstico provável?",
    alternativas: [
      'Doença de Plummer.',
      'Tireoidite linfocítica subaguda.',
      'Doença de Graves.',
      'Tireoidite granulomatosa subaguda.'
    ],
    correta: 2,
    explicacao: "A Doença de Graves é a causa mais comum de hipertireoidismo e se caracteriza pela tríade bócio difuso, oftalmopatia (proptose) e, em alguns casos, dermopatia. O quadro laboratorial mostra TSH suprimido e T3/T4 elevados, e o exame físico com sopro tireoidiano e tremores confirma tireotoxicose."
  },
  {
    id: 3,
    enunciado: "Homem de 50 anos de idade, portador de hipertensão, dislipidemia e diabetes mellitus tipo 2, é admitido no Pronto Socorro com quadro de confusão. Exames de admissão: glicemia = 650 mg/dL; K+ = 2,5 mEq/L; Bicarbonato sérico: 22 mEq/L. Enquanto o paciente aguarda vaga na Unidade de Terapia Intensiva, qual dentre as medidas para controle da glicemia deve ser adotada?",
    alternativas: [
      'Insulina regular intravenosa contínua.',
      'Insulina regular intramuscular a cada 1 hora.',
      'Não iniciar insulinização até a normalização do potássio.',
      'Análogo de insulina ultrarrápida subcutânea a cada 1 hora.'
    ],
    correta: 2,
    explicacao: "O paciente apresenta hiperglicemia e hipopotassemia grave (K+ = 2,5 mEq/L). A insulina promove entrada de potássio nas células, piorando a hipocalemia e aumentando o risco de arritmias. Assim, a insulinização só deve ser iniciada após correção do potássio para valores > 3,3 mEq/L."
  },
  {
    id: 4,
    enunciado: "Homem de 56 anos de idade, tabagista, procura atendimento por febre, tosse com escarro purulento e dor torácica há 5 dias. Exame físico e sinais vitais normais para idade. Não apresenta confusão, FR < 30 irpm, PA > 90/60 mmHg. Baseado no sistema CRB-65 (pontuação zero), qual é a conduta inicial mais apropriada?",
    alternativas: [
      'Iniciar tratamento ambulatorial com amoxicilina + clavulanato; programar retorno em 3 dias.',
      'Solicitar TC de tórax para definir conduta terapêutica.',
      'Iniciar corticoterapia e tratamento com ceftriaxona.',
      'Encaminhar o paciente para internação e tratamento.'
    ],
    correta: 0,
    explicacao: "Com CRB-65 = 0 (sem confusão, FR < 30, PA estável e idade < 65 anos), o paciente é considerado de baixo risco para mortalidade na pneumonia adquirida na comunidade. A conduta é tratamento ambulatorial, sendo amoxicilina + clavulanato opção adequada."
  },
  {
    id: 5,
    enunciado: "Mulher de 26 anos de idade, sem comorbidades, procura atendimento ambulatorial com queixa de disúria, polaciúria e urgência urinária há 2 dias. Nega febre ou dor lombar. Ao exame físico, está afebril e sem dor à palpação lombar. Qual é a conduta mais adequada?",
    alternativas: [
      'Prescrever nitrofurantoína por 5 dias.',
      'Prescrever norfloxacina por 3 dias e, ao final, coletar urocultura de controle.',
      'Solicitar urocultura e, após resultado, avaliar início do antibiótico.',
      'Prescrever fosfomicina por 4 dias.'
    ],
    correta: 0,
    explicacao: "Quadro típico de cistite aguda não complicada: mulher jovem, sem comorbidades e sem sinais de pielonefrite. O tratamento empírico de primeira linha é nitrofurantoína por 5 dias, sem necessidade de urocultura de rotina."
  },
  {
    id: 6,
    enunciado: "Mulher de 40 anos, portadora de diabetes mellitus tipo 1, procura atendimento com fraqueza muscular progressiva e mal-estar, com vômitos e oligúria nas últimas 24 horas. Exames laboratoriais revelam: Ureia: 135 mg/dL, Creatinina: 5,2 mg/dL, Potássio sérico: 7,6 mEq/L, pH arterial: 7,24. Após medidas iniciais para hipercalemia sem melhora clínica, qual é a conduta mais adequada neste momento?",
    alternativas: [
      'Repetir nova dose de insulina com glicose intravenosa.',
      'Iniciar resina trocadora de potássio por via oral.',
      'Iniciar hemodiálise de urgência.',
      'Aguardar resposta às medidas já realizadas e monitorar potássio e ECG.'
    ],
    correta: 2,
    explicacao: "A paciente apresenta hipercalemia grave (K+ = 7,6 mEq/L) refratária às medidas habituais, associada a injúria renal aguda (creatinina 5,2 mg/dL). Nessa situação, há risco elevado de arritmias fatais e a conduta de escolha é hemodiálise de urgência para remoção rápida do potássio."
  },
  {
    id: 7,
    enunciado: "Homem de 40 anos de idade, IMC = 37,5 kg/m², sedentário, tabagista, etilista, apresenta pressão arterial (PA) aferida em duas ocasiões de 150/70 mmHg. Qual a melhor conduta a ser adotada para esse paciente?",
    alternativas: [
      'Reavaliar em 90 dias, uma vez que esses níveis pressóricos são aceitáveis.',
      'Considerá-lo portador de hipertensão arterial e prescrever anti-hipertensivo(s).',
      'Recomendar hábitos de vida saudáveis e acompanhar os níveis pressóricos.',
      'Iniciar terapia com anti-hipertensivos e solicitar MAPA.'
    ],
    correta: 2,
    explicacao: "Há fatores de risco importantes (obesidade, tabagismo, etilismo), mas apenas duas medidas de PA ainda são insuficientes para definir hipertensão. A conduta inicial é orientar perda de peso, cessar tabagismo, reduzir álcool e acompanhar os níveis pressóricos."
  },
  {
    id: 8,
    enunciado: "Homem de 48 anos de idade procura atendimento por dor musculoesquelética difusa há cerca de oito meses, acompanhada de fadiga intensa e sono não reparador. Exame físico: não há sinovite, deformidades articulares ou alterações neurológicas, sendo observada dor generalizada à palpação de pontos musculares dolorosos. Diante da hipótese de fibromialgia, qual é o critério mais adequado para confirmação diagnóstica nesse paciente?",
    alternativas: [
      'Realização de eletroneuromiografia de membros superiores e inferiores.',
      'Realização de pesquisa de autoanticorpos para investigação de doenças autoimunes.',
      'Ausência de sinais inflamatórios ou estruturais ao exame físico.',
      'Realização de ressonância magnética das articulações e da coluna.'
    ],
    correta: 2,
    explicacao: "A fibromialgia é uma síndrome de dor crônica não inflamatória nem degenerativa. A ausência de sinais inflamatórios e estruturais, na presença de dor generalizada, fadiga e sono não reparador, sustenta o diagnóstico em quadro típico, sem necessidade de exames sofisticados."
  },
  {
    id: 9,
    enunciado: "Homem de 68 anos de idade com HIV, sem tratamento, internado em coma vigil por neurotoxoplasmose (lesão com captação em anel). Os familiares solicitam que \"tudo seja feito até o fim\", mas a equipe considera a transição para cuidados paliativos. Diante deste cenário, qual das condutas abaixo é mais apropriada?",
    alternativas: [
      'Postergar cuidados paliativos enquanto houver lesão com captação em anel, por manter potencial de reversibilidade.',
      'Iniciar sedação paliativa mediante decisão judicial por tratar-se de paciente inconsciente.',
      'Priorizar o conforto e dignidade do paciente, evitando intervenções fúteis, mesmo sem consenso familiar imediato.',
      'Manter todas as intervenções invasivas até que a família autorize formalmente a limitação terapêutica.'
    ],
    correta: 2,
    explicacao: "Em situações irreversíveis e refratárias, a equipe deve evitar obstinação terapêutica e priorizar conforto e dignidade, mesmo diante de resistência inicial da família. O princípio é o da proporcionalidade terapêutica e prevenção de intervenções fúteis."
  },
  {
    id: 10,
    enunciado: "Homem de 60 anos, portador de hipertensão e diabetes mellitus tipo 2, apresenta dispneia aos esforços leves, ortopneia e edema de membros inferiores. Ecocardiograma revela fração de ejeção de 28%. Encontra-se em uso de losartana e furosemida. Qual das condutas abaixo tem benefício comprovado na redução de mortalidade para esse paciente?",
    alternativas: [
      'Aumento da dose do diurético de alça.',
      'Prescrição de sacubitril/valsartana em substituição à losartana.',
      'Adição de antagonista de canal de cálcio à terapêutica atual.',
      'Adição de digoxina à terapêutica atual.'
    ],
    correta: 1,
    explicacao: "O quadro é de insuficiência cardíaca com fração de ejeção reduzida (ICFEr). O uso de sacubitril/valsartana (ARNI) demonstrou redução de mortalidade e hospitalizações por IC em comparação com IECA. Diuréticos são sintomáticos e digoxina reduz hospitalizações, mas não mortalidade."
  },
  {
    id: 11,
    enunciado: "Homem de 59 anos, com diagnóstico de diabetes mellitus tipo 2 há 12 anos, apresenta proteinúria de 1,2 g/24h e TFG estimada de 52 mL/min/1,73 m². Qual intervenção está associada à redução da progressão da doença renal na situação apresentada?",
    alternativas: [
      'Prescrição de inibidor do sistema renina-angiotensina.',
      'Restringir ingesta de proteína na dieta para 0,3 g/kg/dia.',
      'Descontinuação da metformina.',
      'Prescrição de furosemida em dose crescente.'
    ],
    correta: 0,
    explicacao: "IECA ou BRA reduzem a pressão intraglomerular e a proteinúria, retardando a progressão da nefropatia diabética. É a intervenção com melhor evidência de nefroproteção em pacientes diabéticos com DRC."
  },
  {
    id: 12,
    enunciado: "Homem de 28 anos, IMC = 29 kg/m², circunferência abdominal = 102 cm, PA = 138/88 mmHg. Exames: Glicemia de jejum: 110 mg/dL; Triglicerídeos: 190 mg/dL; HDL colesterol: 38 mg/dL. Qual intervenção inicial é mais indicada no cuidado a esse paciente?",
    alternativas: [
      'Prescrição isolada de estatina.',
      'Mudança no estilo de vida incluindo dieta e atividade física.',
      'Repetir os exames antes de qualquer prescrição.',
      'Prescrição isolada de ciprofibrato para controle de triglicérides.'
    ],
    correta: 1,
    explicacao: "O paciente preenche critérios de síndrome metabólica. A primeira linha de manejo é sempre intervenção no estilo de vida (dieta, atividade física, perda ponderal), antes da introdução de terapia medicamentosa isolada."
  },
  {
    id: 13,
    enunciado: "Homem de 43 anos, etilista crônico, é admitido com agitação, sudorese profusa, tremores, taquicardia e PA elevada. Relata interrupção do uso de álcool há dois dias. Escala CIWA-Ar: 19 pontos. Qual é a conduta indicada para o paciente na situação descrita?",
    alternativas: [
      'Realizar reposição de vitamina B12 parenteral a fim de evitar complicações neurológicas.',
      'Iniciar haloperidol endovenoso e solicitar revisão laboratorial com hemograma, eletrólitos, glicemia, função renal e hepática, amilase e CPK.',
      'Prescrever diazepam endovenoso e manter monitorização clínica em regime de internação.',
      'Iniciar clorpromazina via intramuscular para controle da agitação e tremores.'
    ],
    correta: 2,
    explicacao: "CIWA-Ar > 18 indica síndrome de abstinência grave, com risco de delirium tremens. O tratamento de primeira linha são benzodiazepínicos (diazepam ou lorazepam), com necessidade de internação, monitorização e reposição de tiamina. Antipsicóticos não são a terapia de escolha."
  },
  {
    id: 14,
    enunciado: "Homem de 48 anos, portador de insuficiência cardíaca descompensada, evoluiu com palpitações e PA de 80x50 mmHg. ECG revela Fibrilação Atrial com instabilidade hemodinâmica. Qual a conduta imediata?",
    alternativas: [
      'Administração de adrenalina.',
      'Prescrição de metoprolol.',
      'Administração de atropina.',
      'Cardioversão.'
    ],
    correta: 3,
    explicacao: "A presença de taquiarritmia (FA) associada à instabilidade hemodinâmica (hipotensão) indica cardioversão elétrica sincronizada imediata como conduta de primeira linha."
  },
  {
    id: 15,
    enunciado: "Homem de 26 anos procura atendimento por lesões cutâneas (manchas não pruriginosas no tronco, membros e palmas das mãos) há 10 dias. Teste Rápido de Sífilis reagente e VDRL não reagente. Qual é a conduta para este paciente (com manifestações de Sífilis secundária)?",
    alternativas: [
      'Indicar o tratamento com três doses de Penicilina G Benzatina.',
      'Indicar o tratamento com duas doses de Penicilina G Benzatina.',
      'Indicar o tratamento com uma dose de Penicilina G Benzatina.',
      'Solicitar novo VDRL e, se positivo, indicar o tratamento.'
    ],
    correta: 2,
    explicacao: "Lesões não pruriginosas em tronco e palmas, mais teste treponêmico reagente, são típicos de sífilis secundária. Sífilis primária, secundária e latente recente são tratadas com dose única de Penicilina G Benzatina 2,4 milhões UI IM."
  },
  {
    id: 16,
    enunciado: "Homem de 43 anos, IMC = 36 kg/m², com glicemia de jejum alterada (115 mg/dL), triglicérides elevados e HDL baixo, além de ronco alto (risco cardiovascular aumentado). Qual a medicação mais indicada para favorecer a perda de peso nesse paciente?",
    alternativas: [
      'Orlistate.',
      'Inibidor da recaptação de dopamina/noradrenalina (bupropiona).',
      'Agonista do receptor de GLP-1 (semaglutida).',
      'Metformina.'
    ],
    correta: 2,
    explicacao: "O paciente apresenta obesidade grau II e síndrome metabólica. Agonistas de GLP-1 (como semaglutida) promovem perda de peso significativa e melhoram parâmetros metabólicos, com benefício cardiovascular, sendo opção preferencial neste perfil de alto risco."
  },
  {
    id: 17,
    enunciado: "Homem de 36 anos, com asma intermitente, apresenta dispneia progressiva e sibilância intensa após infecção de vias aéreas superiores recente. A radiografia de tórax é normal. Qual exame auxilia na confirmação da exacerbação asmática desse paciente?",
    alternativas: [
      'Pico de fluxo expiratório reduzido.',
      'Procalcitonina sérica aumentada.',
      'Gasometria arterial com hipoxemia leve.',
      'Dosagem de IgE total.'
    ],
    correta: 0,
    explicacao: "A medida seriada do pico de fluxo expiratório (PFE) permite avaliar objetivamente o grau de obstrução de vias aéreas, sendo útil na confirmação e monitorização de exacerbações de asma."
  },
  {
    id: 18,
    enunciado: "Homem de 28 anos, relata febre baixa persistente há 10 dias, sudorese noturna e linfadenopatia cervical bilateral após relações sexuais desprotegidas. Suspeita-se de infecção aguda pelo HIV. Qual é o exame mais indicado para o diagnóstico dessa infecção na fase aguda?",
    alternativas: [
      'Teste rápido sorológico (teste imunocromatográfico) de detecção de anticorpos circulantes.',
      'Teste sorológico imunoenzimático (ELISA de 4ª geração) de detecção de antígeno p24 e de anticorpos circulantes.',
      'Teste de imunofenotipagem para a determinação da contagem de linfócitos T CD4+.',
      'Teste sorológico pela técnica de imunoblot ou western blot de detecção de anticorpos circulantes.'
    ],
    correta: 1,
    explicacao: "Na infecção aguda pelo HIV, a produção de anticorpos pode não estar completa. O ELISA de 4ª geração detecta simultaneamente o antígeno p24 e anticorpos anti-HIV, reduzindo o período de janela imunológica, sendo o exame de escolha."
  },
  {
    id: 19,
    enunciado: "Homem de 28 anos, queixa-se de diarreia há 4 meses, dor abdominal, perda de peso (7 kg), e saída de secreção mucopurulenta da região perianal. Investigação revela anemia, deficiência de vitamina B12 e colonoscopia com inflamação segmentar e transmural. Qual o diagnóstico mais provável?",
    alternativas: [
      'Síndrome do intestino irritável.',
      'Intolerância à lactose.',
      'Doença de Crohn.',
      'Colite ulcerosa.'
    ],
    correta: 2,
    explicacao: "Diarreia crônica, perda de peso, lesão perianal e inflamação segmentar transmural são típicos da Doença de Crohn, uma doença inflamatória intestinal que pode afetar todo o trato digestório, em padrão descontínuo."
  },
  {
    id: 20,
    enunciado: "Homem de 32 anos procura atendimento por dor torácica recorrente há 3 meses. Dor em aperto, retroesternal, precipitada por esforço físico e aliviada com repouso. Pai teve IAM aos 45 anos. ECG e exames laboratoriais normais. Qual é a conduta diante do quadro clínico desse paciente?",
    alternativas: [
      'Solicitar cineangiocoronariografia.',
      'Iniciar estatina de alto impacto imediatamente.',
      'Iniciar dupla antiagregação plaquetária.',
      'Solicitar teste ergométrico para avaliação funcional.'
    ],
    correta: 3,
    explicacao: "Dor típica de angina estável em paciente de risco baixo/moderado e com exames basais normais deve ser inicialmente avaliada com teste ergométrico (estratificação funcional não invasiva) para pesquisa de isquemia indutível."
  },
  {
    id: 21,
    enunciado: "Mulher de 32 anos de idade apresenta diarreia aquosa, com mais de 10 dejeções por dia, sem sangue ou muco. Ela apresenta dores articulares, predominantemente nos joelhos e tornozelos, e revela emagrecimento. A biópsia da mucosa duodenal revelou aumento de linfócitos intraepiteliais, atrofia de vilosidades e hiperplasia de criptas. Qual é o diagnóstico mais provável?",
    alternativas: [
      'Enterocolite por Campylobacter.',
      'Deficiência de lactase.',
      'Doença celíaca.',
      'Doença de Whipple.'
    ],
    correta: 2,
    explicacao: "A Doença Celíaca cursa com diarreia crônica, perda de peso e manifestações extraintestinais, como artralgias. O padrão histológico típico é atrofia de vilosidades, hiperplasia de criptas e aumento de linfócitos intraepiteliais."
  },
  {
    id: 22,
    enunciado: "Mulher de 27 anos de idade procura atendimento médico com queixa de perda de peso, sentimento de tristeza constante e falta de “prazer na vida”, além de pensamentos suicidas. Foi diagnosticado transtorno depressivo maior e prescrito o antidepressivo fluoxetina. Por que existe uma demora no início do efeito terapêutico da fluoxetina?",
    alternativas: [
      'São necessárias algumas semanas para que os auto-receptores sejam dessensibilizados às concentrações sinápticas elevadas de serotonina produzidas pela fluoxetina no tratamento agudo.',
      'São necessárias algumas semanas para que as vesículas pré-sinápticas armazenem concentrações aumentadas de serotonina promovidas pelo tratamento com fluoxetina.',
      'São necessárias algumas semanas para que a fluoxetina diminua a sensibilidade dos receptores de serotonina pós-sinápticos.',
      'São necessárias algumas semanas para que a fluoxetina aumente a síntese de serotonina, por aumento da captação de triptofano pelo neurônio pré-sináptico.'
    ],
    correta: 0,
    explicacao: "A fluoxetina inibe a recaptação de serotonina, aumentando sua concentração sináptica. Inicialmente, há ativação de auto-receptores pré-sinápticos que reduzem a liberação de serotonina. Com o uso contínuo, esses auto-receptores se dessensibilizam, permitindo maior liberação de serotonina e surgimento do efeito antidepressivo após algumas semanas."
  },
  {
    id: 23,
    enunciado: "Homem de 52 anos de idade é atendido no Pronto Socorro com queixas de diminuição acentuada do volume urinário (oligúria) nos últimos três dias, inchaço nas pernas e cansaço extremo. Ele tem histórico de hipertensão arterial mal controlada e recentemente foi tratado com anti-inflamatórios não esteroides (AINEs). Exames: Creatinina sérica = 4,5 mg/dL; Ureia sérica = 90 mg/dL; Potássio sérico = 5,8 mEq/L. Exame sumário de urina: presença de cilindros granulosos. Qual é o diagnóstico mais provável e o mecanismo fisiopatológico envolvido?",
    alternativas: [
      'Glomerulonefrite aguda, uma condição inflamatória dos glomérulos renais.',
      'Síndrome nefrótica, condição decorrente de lesões glomerulares.',
      'Nefropatia por AINEs, caracterizada por lesão renal aguda devida à inibição da síntese de prostaglandinas, resultando em vasoconstrição renal e redução do fluxo sanguíneo renal.',
      'Nefropatia diabética, uma complicação crônica do diabetes mellitus.'
    ],
    correta: 2,
    explicacao: "AINEs inibem a síntese de prostaglandinas renais, que são vasodilatadoras, levando à vasoconstrição arteriolar aferente e redução do fluxo sanguíneo renal, com injúria renal aguda. Em paciente hipertenso com uso recente de AINEs e oligúria, a nefropatia por AINEs é o diagnóstico mais provável."
  },
  {
    id: 24,
    enunciado: "Homem de 32 anos de idade, pintor autônomo, procurou a Unidade Básica de Saúde do bairro com queixa de uma única ferida no corpo que tem aumentado de tamanho. Relata que a ferida apareceu duas semanas após uma pescaria numa região de mata no vale de um rio, há 45 dias. A histopatologia mostrou macrófagos repletos de estruturas intracelulares esféricas e a intradermorreação de Montenegro (IDRM) teve resultado positivo. Qual é o diagnóstico, a forma clínica e o achado mais provável no anatomopatológico?",
    alternativas: [
      'Leishmaniose tegumentar americana, forma cutânea difusa; foram identificadas formas promastigotas.',
      'Leishmaniose tegumentar americana, forma cutaneomucosa; foram identificadas formas paramastigotas intracelulares.',
      'Leishmaniose tegumentar americana, forma cutânea; a biópsia identificou formas amastigotas intracelulares.',
      'Leishmaniose tegumentar americana, forma mucosa; a biópsia identificou formas amastigotas intracelulares.'
    ],
    correta: 2,
    explicacao: "A Leishmaniose Tegumentar Americana, forma cutânea, cursa com lesão única ou poucas lesões em área de exposição, IDRM positiva e achado de amastigotas intracelulares em macrófagos na biópsia. As promastigotas são formas presentes no vetor (flebótomo)."
  },
  {
    id: 25,
    enunciado: "Homem com 25 anos de idade é portador de hemoglobinopatia e tem internações de repetição por crises álgicas, venoclusivas e necessidade transfusional. A esposa está grávida. A eletroforese de hemoglobina do pai é SS (banda direita) e da mãe é AA (banda esquerda). De acordo com esse resultado, qual é a hemoglobinopatia do paciente e qual o risco do bebê apresentá-la?",
    alternativas: [
      'Traço falcêmico, sem risco para o bebê.',
      'Traço falcêmico, com 25% de risco para o bebê.',
      'Anemia falciforme, com 50% de risco para o bebê.',
      'Anemia falciforme, sem risco para o bebê.'
    ],
    correta: 3,
    explicacao: "Genótipo SS indica anemia falciforme; AA é normal. A prole obrigatoriamente terá genótipo AS (um alelo S do pai e um A da mãe), ou seja, traço falcêmico. Não há risco de o filho ter anemia falciforme, apenas ser portador."
  },
  {
    id: 26,
    enunciado: "Homem de 48 anos de idade, enfermeiro de Pronto Socorro, sofreu ferimento acidental da região palmar com cateter sobre agulha de grosso calibre (Abocath 18) em paciente fonte HIV positivo. Doze dias depois o profissional de saúde passou a apresentar febre seguida de mialgia, adenopatia cervical, faringite, exantema e cefaleia. Considerando os estágios de Fiebig e o período de janela imunológica para os diferentes ensaios, qual é o teste mais indicado para investigar a infecção aguda pelo HIV?",
    alternativas: [
      'Western blot.',
      'Carga viral (HIV RNA PCR).',
      'Antigenemia p24.',
      'Imunoensaio de terceira geração.'
    ],
    correta: 1,
    explicacao: "Entre 10 e 17 dias pós-exposição (Estágio I de Fiebig), o teste que primeiro se torna positivo é o RNA viral (carga viral por PCR). Antígeno p24 e testes sorológicos tornam-se positivos mais tarde."
  },
  {
    id: 27,
    enunciado: "Mulher de 48 anos de idade foi encaminhada ao serviço de Gastroenterologia pelo achado casual de alterações na cinética do ferro. O teste genético para hemocromatose detectou homozigose para a mutação C282Y. Qual é o parâmetro laboratorial que frequentemente encontra-se reduzido em casos como este?",
    alternativas: [
      'Ferritina.',
      'Índice de saturação da transferrina.',
      'Capacidade total de ligação do ferro (TIBC).',
      'Ferro sérico.'
    ],
    correta: 2,
    explicacao: "Na hemocromatose há aumento do ferro sérico e da ferritina, com elevado índice de saturação da transferrina. A síntese de transferrina diminui, levando à redução da capacidade total de ligação do ferro (TIBC)."
  },
  {
    id: 28,
    enunciado: "Mulher de 38 anos de idade compareceu a consulta ambulatorial referindo dores articulares limitantes, com edema local e rigidez matinal das mãos, evoluindo há seis meses. Ao exame físico foram evidenciadas tumefações simétricas nas articulações interfalangeanas proximais e metacarpofalangeanas. Detectou-se também elevação das provas inflamatórias (VHS e PCR) e a presença, em altos níveis, de autoanticorpos contra as proteínas com resíduos citrulinados. Confirmou-se a hipótese diagnóstica de uma doença autoimune - artrite reumatoide. Qual é o achado que contribui de maneira mais significativa para o diagnóstico definitivo deste caso?",
    alternativas: [
      'Os sinais cardinais da inflamação evidenciados no exame físico.',
      'A velocidade de sedimentação globular elevada.',
      'Os níveis elevados da pentraxina de fase aguda; a proteína C reativa.',
      'A detecção de anticorpos contra antígenos autólogos específicos.'
    ],
    correta: 3,
    explicacao: "Na artrite reumatoide, embora VHS e PCR indiquem inflamação, o achado mais específico é a presença de autoanticorpos, como o fator reumatoide e especialmente o anti-CCP, que têm alta especificidade e auxiliam no diagnóstico definitivo."
  },
  {
    id: 29,
    enunciado: "Mulher de 25 anos de idade apresenta dor abdominal aguda no quadrante inferior direito há aproximadamente 24 horas. A dor migrou para o quadrante inferior direito, tornando-se intensa e contínua. A paciente relata náuseas, vômitos e falta de apetite. Ao exame físico há sensibilidade à palpação no ponto de McBurney, além de defesa muscular localizada. Além da leucocitose com aumento de bastonetes, quais são os achados mais prováveis no hemograma?",
    alternativas: [
      'Granulações tóxicas, corpúsculos de Döhle e vacúolos citoplasmáticos.',
      'Vacúolos citoplasmáticos, corpos de Heinz e corpúsculos de Howell-Jolly.',
      'Corpos de Heinz, corpúsculos de Howell-Jolly e hastes de Auer.',
      'Corpúsculos de Döhle, vacúolos citoplasmáticos e corpos de Heinz.'
    ],
    correta: 0,
    explicacao: "Na apendicite aguda, processo infeccioso-inflamatório, são comuns alterações reativas dos neutrófilos como granulações tóxicas, corpúsculos de Döhle e vacúolos citoplasmáticos. Corpos de Heinz e Howell-Jolly se associam a outros distúrbios hematológicos; hastes de Auer à leucemia mieloide aguda."
  },
  {
    id: 30,
    enunciado: "Homem, 63 anos, com doença pulmonar obstrutiva crônica (DPOC) apresenta sintomas de falta de ar e dificuldades respiratórias. Foi à Unidade Básica de Saúde, onde foi prescrito um medicamento para a melhora dos sintomas. Qual é a classe do medicamento que deve ser prescrita para esse paciente e qual o seu mecanismo de ação?",
    alternativas: [
      'Agonista dos receptores nicotínicos, que atua reduzindo o processo inflamatório e induzindo a vasodilatação, o que contribui para o alívio da dispneia.',
      'Antagonista dos receptores muscarínicos, que promove o relaxamento dos músculos lisos das vias respiratórias, resultando em broncodilatação.',
      'Antagonista dos receptores beta-adrenérgicos, que promove vasoconstrição, redução da inflamação e broncodilatação.',
      'Agonista colinérgico, que promove a redução da produção de muco, melhorando a vascularização e a facilitação da troca gasosa.'
    ],
    correta: 1,
    explicacao: "Antagonistas muscarínicos inalatórios (anticolinérgicos) são fundamentais no tratamento da DPOC. Eles bloqueiam a ação da acetilcolina nos receptores M, promovendo relaxamento da musculatura lisa brônquica e broncodilatação."
  },
  {
    id: 31,
    enunciado: "Adolescente de 13 anos de idade é atendido na Unidade de Pronto Atendimento com crise moderada de asma, obtendo rápida melhora. Durante a anamnese relatou que as crises são agravadas com a exposição à poeira, pelos de animais e mofo. Hemograma realizado anteriormente mostrou eosinofilia. Qual das explicações a seguir melhor caracteriza o mecanismo de doença relacionado à situação clínica descrita?",
    alternativas: [
      'É uma doença não inflamatória induzida principalmente por uma reação de hipersensibilidade do tipo 3, com envolvimento de linfócitos Th1, macrófagos, basófilos e eosinófilos, e aumento do nível sérico de IgG.',
      'O paciente apresenta asma brônquica, caracterizada imunologicamente como reação de hipersensibilidade do tipo II, na qual o contato Ag-Ac desencadeia as manifestações clínicas.',
      'Trata-se de uma doença alérgica, em que a resposta imune é desencadeada a partir de uma resposta de células Th1, com produção de interleucinas inflamatórias e produção de IgE.',
      'A resposta imune nos indivíduos alérgicos é do tipo Th2, que é a responsável pela indução da secreção de interleucinas produtoras de IgE e pela eosinofilia observada nesses pacientes.'
    ],
    correta: 3,
    explicacao: "A asma alérgica é uma reação de hipersensibilidade do tipo I, mediada por IgE. A resposta é predominantemente Th2, com produção de IL-4, IL-5 e IL-13, o que estimula produção de IgE e recrutamento de eosinófilos, justificando a eosinofilia."
  },
  {
    id: 32,
    enunciado: "Mulher de 56 anos de idade queixa-se de fadiga persistente, perda de peso involuntária e episódios de febre noturna nos últimos três meses. Ao exame físico apresenta linfadenopatia generalizada. Os exames laboratoriais revelam anemia normocítica normocrômica, leucocitose com predominância de linfócitos, e trombocitopenia. Qual é o diagnóstico mais provável e a sua base fisiopatológica?",
    alternativas: [
      'Anemia aplástica; destruição autoimune das células-tronco hematopoiéticas.',
      'Leucemia linfocítica crônica (LLC); acúmulo de linfócitos B maduros, mas funcionalmente incompetentes.',
      'Mieloma múltiplo; proliferação clonal de plasmócitos que produzem imunoglobulinas monoclonais.',
      'Linfoma de Hodgkin; proliferação maligna de linfócitos B com formação de células de Reed-Sternberg.'
    ],
    correta: 1,
    explicacao: "Sintomas B (febre, perda de peso), linfadenopatia generalizada, linfocitose e citopenias periféricas são típicos de leucemia linfocítica crônica, caracterizada pela proliferação clonal de linfócitos B maduros, porém funcionalmente incompetentes."
  },
  {
    id: 33,
    enunciado: "Mulher de 37 anos de idade foi encaminhada para um ambulatório especializado devido a queixas de agitação, irritabilidade frequente, palpitações e dispneia. O exame físico da paciente mostrava proptose ocular, PA = 110 x 70 mmHg, FC = 112 bpm, edema de membros inferiores (1/4), crepitações bibasais à ausculta pulmonar e bulhas hiperfonéticas. Resultado dos exames realizados: TSH diminuído, T3 e T4 elevados. Quais os mecanismos que melhor explicam o quadro clínico descrito (Hipertireoidismo)?",
    alternativas: [
      'Diminuição da pressão de enchimento ventricular, taquiarritmias persistentes e diminuição da resistência vascular periférica.',
      'Aumento da pressão de enchimento ventricular, taquicardia persistente e aumento da pré-carga.',
      'Aumento da resistência vascular periférica, diminuição do débito cardíaco e aumento da pré-carga.',
      'Taquiarritmia persistente, diminuindo o relaxamento diastólico e aumento do débito cardíaco.'
    ],
    correta: 1,
    explicacao: "No hipertireoidismo ocorre aumento do metabolismo, taquicardia persistente, aumento do volume sanguíneo e do retorno venoso, com elevação da pré-carga e da pressão de enchimento ventricular, podendo levar a insuficiência cardíaca de alto débito e congestão."
  },
  {
    id: 34,
    enunciado: "Homem de 69 anos de idade, tabagista, com história de hipertensão e diabetes, acorda afásico e plégico em membro superior direito. Sem melhora após 6 horas, foi levado ao Pronto Socorro. A primeira tomografia realizada não demonstrou alteração significativa, apenas um leve apagamento dos sulcos em região frontoparietal esquerda. Após 24 horas foi repetida a tomografia, sendo agora evidente uma área de hipodensidade (relacionada à isquemia) na região frontoparietal esquerda, preservando a porção medial deste hemisfério cerebral. Qual é a artéria responsável pela isquemia cerebral do paciente?",
    alternativas: [
      'Artéria cerebral posterior esquerda.',
      'Artéria basilar.',
      'Artéria cerebral anterior esquerda.',
      'Artéria cerebral média esquerda.'
    ],
    correta: 3,
    explicacao: "A região frontoparietal lateral é irrigada predominantemente pela artéria cerebral média. O quadro de hemiparesia braquiocrural e afasia (hemisfério dominante esquerdo) é classicamente associado ao território da ACM esquerda."
  },
  {
    id: 35,
    enunciado: "Mulher de 73 anos de idade, hipertensa, diabética e dislipidêmica, procura Emergência com dor precordial em aperto, irradiada para a mandíbula, sudorese fria, em repouso. PA = 86x64 mmHg; FC = 116 bpm; ECG mostra infradesnivelamento de ST em D2, D3 e aVF. Qual é a conduta mais adequada no tratamento inicial dessa paciente com SCA sem supra de ST?",
    alternativas: [
      'Trombolítico venoso.',
      'Nitrato venoso.',
      'Betabloqueador oral.',
      'Antiagregação plaquetária oral.'
    ],
    correta: 3,
    explicacao: "A paciente apresenta síndrome coronariana aguda sem supra de ST, com instabilidade hemodinâmica. A antiagregação plaquetária (AAS, P2Y12) deve ser instituída o quanto antes. Nitratos e betabloqueadores podem estar contraindicados diante da hipotensão e sinais de falência cardíaca."
  },
  {
    id: 36,
    enunciado: "Homem de 35 anos de idade procurou assistência médica com queixa de astenia e náuseas persistentes há aproximadamente 10 dias. O paciente relata ter tido relação sexual desprotegida há 2 meses. Exame físico sem alterações, exceto por hepatomegalia discreta, dolorosa. A avaliação laboratorial mostrou, como única alteração significativa, a elevação dos níveis séricos de alanina aminotransferase (1.500 UI/L) e de aspartato aminotransferase (1.200 U/L). Quais são os marcadores sorológicos que mais provavelmente apresenta esse paciente?",
    alternativas: [
      'HBsAg, HBeAg e Anti-HBc IgM.',
      'HBsAg, HBeAg e Anti-HBc IgG.',
      'HBsAg, Anti-HBe e Anti-HBc IgM.',
      'HBsAg, Anti-HBc IgG e Anti-HBs.'
    ],
    correta: 0,
    explicacao: "O quadro é compatível com hepatite B aguda. Nessa fase, observa-se HBsAg positivo, HBeAg positivo (alta replicação viral) e Anti-HBc IgM positivo, marcador de infecção recente."
  },
  {
    id: 37,
    enunciado: "Mulher de 18 anos de idade iniciou há 4 dias quadro de febre alta (39 ºC), cefaleia, dor retrorbitária, náuseas, vômitos, anorexia e dor abdominal. Exames laboratoriais: hemograma com leucopenia e linfopenia. Qual é o exame mais adequado para o diagnóstico dessa paciente?",
    alternativas: [
      'Pesquisa do antígeno NS-1 do vírus da dengue.',
      'Pesquisa de anticorpos IgG contra o vírus da dengue.',
      'Pesquisa de anticorpos IgM contra o vírus da dengue.',
      'Cultura para o vírus da dengue.'
    ],
    correta: 0,
    explicacao: "O quadro clínico é sugestivo de dengue, e a paciente está no 4º dia de sintomas. O teste ideal neste período é a pesquisa do antígeno NS1, detectável do 1º ao 5º dia de doença. A sorologia IgM é mais útil após o 5º dia."
  },
  {
    id: 38,
    enunciado: "Homem de 26 anos de idade, fisiculturista, sofreu agressão perpetrada em via pública por quatro desconhecidos, que desferiram contra ele violentos golpes com um porrete de madeira, tendo o paciente utilizado na ocasião principalmente o antebraço direito para defender-se. Três dias depois o paciente retornou à Emergência referindo náuseas e vômitos nas últimas seis horas, adinamia e dor de grande intensidade no antebraço direito, que apresentava edema de grande intensidade, endurecido, já estendendo-se ao terço inferior do braço, com desaparecimento do pulso periférico na região. A avaliação clínico-laboratorial revelou a ocorrência de rabdomiólise severa, com desidratação, urina “cor de chá” (mioglobinúria), nível sérico de creatinofosfoquinase (CPK) muito elevado, sinais de grave comprometimento da função renal – creatinina sérica elevada, azotemia, acidose metabólica.",
    alternativas: [
      '1 – E, F; 2 – B, C; 3 – G, H; 4 – D, H',
      '1 – E, F; 2 – B, C; 3 – D, H; 4 – A, H',
      '1 – C, F; 2 – B, E; 3 – D, H; 4 – A, G',
      '1 – C, E; 2 – B, F; 3 – A, G; 4 – D, H'
    ],
    correta: 3,
    explicacao: "O quadro é de rabdomiólise complicada com síndrome compartimental e injúria renal aguda. 1. Síndrome Compartimental: edema, dor intensa e ausência de pulso (C) decorrentes de lesão muscular aguda (E). 2. Lesão Muscular: lise da membrana celular (F) resultando em liberação de potássio, fosfato, ácido úrico e CPK (B). 3. Injúria Renal Aguda: deposição intratubular de mioglobina (A) levando à necrose tubular aguda (G). 4. Fisiopatologia: alterações iônicas com fluxo anormal de Na+ e Ca2+ (D) culminando em hipercalemia e acidose metabólica (H)."
  },
  {
    id: 39,
    enunciado: "Homem de 56 anos de idade, com hipertensão arterial sistêmica de longa data, em tratamento irregular com losartana, e diabetes mellitus do tipo 2 há 10 anos, em uso irregular de metformina, solicita visita domiciliar ao médico de família da Unidade Básica de Saúde (UBS) por não conseguir deambular, devido a dor de forte intensidade na articulação metatarsofalangiana do primeiro pododáctilo esquerdo, com início súbito na madrugada anterior. Refere quadros semelhantes desde os 35 anos de idade, que estão se tornando mais frequentes ultimamente. Nega febre. Refere libação alimentar e alcoólica há 12 horas. Exame físico: sinais flogísticos na articulação metatarsofalangiana e nódulos cutâneos endurecidos em faces extensoras das mãos e hélices auriculares. Qual é a conduta terapêutica indicada para o paciente?",
    alternativas: [
      'Anti-inflamatório não hormonal e colchicina.',
      'Anti-inflamatório esteroidal e diurético de alça.',
      'Anti-inflamatório esteroidal e diurético tiazídico.',
      'Anti-inflamatório não hormonal e uricosúricos.'
    ],
    correta: 0,
    explicacao: "O quadro clínico é de gota aguda com tofos (nódulos de ácido úrico). O tratamento da crise aguda visa alívio da inflamação e da dor, sendo AINEs e colchicina terapias de primeira linha. Uricosúricos e ajustes de medicação crônica não devem ser iniciados durante a crise."
  },
  {
    id: 40,
    enunciado: "Mulher de 30 anos de idade foi encaminhada ao ambulatório especializado devido a queixas de febre (T = 38 °C) há 15 dias, poliartralgia, indisposição generalizada, humor deprimido e placas eritematosas fotossensíveis. A paciente relata que nos últimos 7 dias percebeu redução significativa do volume urinário e urina \"bastante espumosa\". Qual é a alteração laboratorial mais provável dessa paciente?",
    alternativas: [
      'Leucocitose, VHS aumentado, hipercomplementenemia e bacteriúria intensa.',
      'Leucopenia, VHS normal, normocomplementenemia e hematúria.',
      'Leucocitose, VHS normal, hipocomplementenemia e bacteriúria intensa.',
      'Leucopenia, VHS aumentado, hipocomplementenemia e proteinúria 3+/4+.'
    ],
    correta: 3,
    explicacao: "O quadro é compatível com lúpus eritematoso sistêmico (LES) com nefrite lúpica: rash fotossensível, febre, poliartralgia, sintomas sistêmicos e sinais de comprometimento renal (urina espumosa, oligúria). Achados laboratoriais típicos incluem leucopenia, VHS elevado, hipocomplementenemia (consumo de complemento) e proteinúria significativa."
  }
];