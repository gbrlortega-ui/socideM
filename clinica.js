window.clinicaQuestions = [
  {
    id: 1,
    enunciado: `Homem de 85 anos de idade é internado em Unidade de Terapia Intensiva com quadro de pneumonia bacteriana comunitária. O paciente é portador de demência de Alzheimer, hipertensão e diabetes. Na admissão foi evidenciado que o paciente apresentava, há três dias, alteração de comportamento, alternando períodos de agitação com hipoatividade, flutuação do nível de consciência ao longo do dia e déficit de atenção. Qual é o diagnóstico mais provável desse paciente?`,
    alternativas: [
      'Depressão maior.',
      'Delirium misto.',
      'Psicose não orgânica.',
      'Evolução da demência.'
    ],
    correta: 1,
    explicacao: `O quadro clínico é compatível com delirium, por apresentar início agudo, evolução flutuante, desatenção e alteração no nível de consciência, sendo a demência de Alzheimer um fator predisponente e a pneumonia um fator desencadeante. A alternância entre agitação (hiperatividade) e hipoatividade define o delirium misto.`
  },
  {
    id: 2,
    enunciado: `Mulher de 18 anos de idade queixa-se de perda de peso, palpitações e agitação psicomotora há dois meses. Exame físico: PA = 130 x 60 mmHg, FC = 132 bpm, tremores finos de extremidades e tireoide aumentada difusamente de volume, indolor, com temperatura local elevada e sopro tireoidiano, além de proptose bilateral sem sinais flogísticos oculares. Exames laboratoriais: TSH = 0,01 mcUI/ml; T4 livre = 2,5 ng/dL; T3 = 268 ng/dL. Qual o diagnóstico provável?`,
    alternativas: [
      'Doença de Plummer.',
      'Tireoidite linfocítica subaguda.',
      'Doença de Graves.',
      'Tireoidite granulomatosa subaguda.'
    ],
    correta: 2,
    explicacao: `A Doença de Graves é a causa mais comum de hipertireoidismo e se caracteriza pela tríade bócio difuso, oftalmopatia (proptose) e, em alguns casos, dermopatia. O quadro laboratorial mostra TSH suprimido e T3/T4 elevados, e o exame físico com sopro tireoidiano e tremores confirma tireotoxicose.`
  },
  {
    id: 3,
    enunciado: `Homem de 50 anos de idade, portador de hipertensão, dislipidemia e diabetes mellitus tipo 2, é admitido no Pronto Socorro com quadro de confusão. Exames de admissão: glicemia = 650 mg/dL; K+ = 2,5 mEq/L; Bicarbonato sérico: 22 mEq/L. Enquanto o paciente aguarda vaga na Unidade de Terapia Intensiva, qual dentre as medidas para controle da glicemia deve ser adotada?`,
    alternativas: [
      'Insulina regular intravenosa contínua.',
      'Insulina regular intramuscular a cada 1 hora.',
      'Não iniciar insulinização até a normalização do potássio.',
      'Análogo de insulina ultrarrápida subcutânea a cada 1 hora.'
    ],
    correta: 2,
    explicacao: `O paciente apresenta hiperglicemia e hipopotassemia grave (K+ = 2,5 mEq/L). A insulina promove entrada de potássio nas células, piorando a hipocalemia e aumentando o risco de arritmias. Assim, a insulinização só deve ser iniciada após correção do potássio para valores > 3,3 mEq/L.`
  },
  {
    id: 4,
    enunciado: `Homem de 56 anos de idade, tabagista, procura atendimento por febre, tosse com escarro purulento e dor torácica há 5 dias. Exame físico e sinais vitais normais para idade. Não apresenta confusão, FR < 30 irpm, PA > 90/60 mmHg. Baseado no sistema CRB-65 (pontuação zero), qual é a conduta inicial mais apropriada?`,
    alternativas: [
      'Iniciar tratamento ambulatorial com amoxicilina + clavulanato; programar retorno em 3 dias.',
      'Solicitar TC de tórax para definir conduta terapêutica.',
      'Iniciar corticoterapia e tratamento com ceftriaxona.',
      'Encaminhar o paciente para internação e tratamento.'
    ],
    correta: 0,
    explicacao: `Com CRB-65 = 0 (sem confusão, FR < 30, PA estável e idade < 65 anos), o paciente é considerado de baixo risco para mortalidade na pneumonia adquirida na comunidade. A conduta é tratamento ambulatorial, sendo amoxicilina + clavulanato opção adequada.`
  },
  {
    id: 5,
    enunciado: `Mulher de 26 anos de idade, sem comorbidades, procura atendimento ambulatorial com queixa de disúria, polaciúria e urgência urinária há 2 dias. Nega febre ou dor lombar. Ao exame físico, está afebril e sem dor à palpação lombar. Qual é a conduta mais adequada?`,
    alternativas: [
      'Prescrever nitrofurantoína por 5 dias.',
      'Prescrever norfloxacina por 3 dias e, ao final, coletar urocultura de controle.',
      'Solicitar urocultura e, após resultado, avaliar início do antibiótico.',
      'Prescrever fosfomicina por 4 dias.'
    ],
    correta: 0,
    explicacao: `Quadro típico de cistite aguda não complicada: mulher jovem, sem comorbidades e sem sinais de pielonefrite. O tratamento empírico de primeira linha é nitrofurantoína por 5 dias, sem necessidade de urocultura de rotina.`
  },
  {
    id: 6,
    enunciado: `Mulher de 40 anos, portadora de diabetes mellitus tipo 1, procura atendimento com fraqueza muscular progressiva e mal-estar, com vômitos e oligúria nas últimas 24 horas. Exames laboratoriais revelam: Ureia: 135 mg/dL, Creatinina: 5,2 mg/dL, Potássio sérico: 7,6 mEq/L, pH arterial: 7,24. Após medidas iniciais para hipercalemia sem melhora clínica, qual é a conduta mais adequada neste momento?`,
    alternativas: [
      'Repetir nova dose de insulina com glicose intravenosa.',
      'Iniciar resina trocadora de potássio por via oral.',
      'Iniciar hemodiálise de urgência.',
      'Aguardar resposta às medidas já realizadas e monitorar potássio e ECG.'
    ],
    correta: 2,
    explicacao: `A paciente apresenta hipercalemia grave (K+ = 7,6 mEq/L) refratária às medidas habituais, associada a injúria renal aguda (creatinina 5,2 mg/dL). Nessa situação, há risco elevado de arritmias fatais e a conduta de escolha é hemodiálise de urgência para remoção rápida do potássio.`
  },
  {
    id: 7,
    enunciado: `Homem de 40 anos de idade, IMC = 37,5 kg/m², sedentário, tabagista, etilista, apresenta pressão arterial (PA) aferida em duas ocasiões de 150/70 mmHg. Qual a melhor conduta a ser adotada para esse paciente?`,
    alternativas: [
      'Reavaliar em 90 dias, uma vez que esses níveis pressóricos são aceitáveis.',
      'Considerá-lo portador de hipertensão arterial e prescrever anti-hipertensivo(s).',
      'Recomendar hábitos de vida saudáveis e acompanhar os níveis pressóricos.',
      'Iniciar terapia com anti-hipertensivos e solicitar MAPA.'
    ],
    correta: 2,
    explicacao: `Há fatores de risco importantes (obesidade, tabagismo, etilismo), mas apenas duas medidas de PA ainda são insuficientes para definir hipertensão. A conduta inicial é orientar perda de peso, cessar tabagismo, reduzir álcool e acompanhar os níveis pressóricos.`
  },
  {
    id: 8,
    enunciado: `Homem de 48 anos de idade procura atendimento por dor musculoesquelética difusa há cerca de oito meses, acompanhada de fadiga intensa e sono não reparador. Exame físico: não há sinovite, deformidades articulares ou alterações neurológicas, sendo observada dor generalizada à palpação de pontos musculares dolorosos. Diante da hipótese de fibromialgia, qual é o critério mais adequado para confirmação diagnóstica nesse paciente?`,
    alternativas: [
      'Realização de eletroneuromiografia de membros superiores e inferiores.',
      'Realização de pesquisa de autoanticorpos para investigação de doenças autoimunes.',
      'Ausência de sinais inflamatórios ou estruturais ao exame físico.',
      'Realização de ressonância magnética das articulações e da coluna.'
    ],
    correta: 2,
    explicacao: `A fibromialgia é uma síndrome de dor crônica não inflamatória nem degenerativa. A ausência de sinais inflamatórios e estruturais, na presença de dor generalizada, fadiga e sono não reparador, sustenta o diagnóstico em quadro típico, sem necessidade de exames sofisticados.`
  },
  {
    id: 9,
    enunciado: `Homem de 68 anos de idade com HIV, sem tratamento, internado em coma vigil por neurotoxoplasmose (lesão com captação em anel). Os familiares solicitam que "tudo seja feito até o fim", mas a equipe considera a transição para cuidados paliativos. Diante deste cenário, qual das condutas abaixo é mais apropriada?`,
    alternativas: [
      'Postergar cuidados paliativos enquanto houver lesão com captação em anel, por manter potencial de reversibilidade.',
      'Iniciar sedação paliativa mediante decisão judicial por tratar-se de paciente inconsciente.',
      'Priorizar o conforto e dignidade do paciente, evitando intervenções fúteis, mesmo sem consenso familiar imediato.',
      'Manter todas as intervenções invasivas até que a família autorize formalmente a limitação terapêutica.'
    ],
    correta: 2,
    explicacao: `Em situações irreversíveis e refratárias, a equipe deve evitar obstinação terapêutica e priorizar conforto e dignidade, mesmo diante de resistência inicial da família. O princípio é o da proporcionalidade terapêutica e prevenção de intervenções fúteis.`
  },
  {
    id: 10,
    enunciado: `Homem de 60 anos, portador de hipertensão e diabetes mellitus tipo 2, apresenta dispneia aos esforços leves, ortopneia e edema de membros inferiores. Ecocardiograma revela fração de ejeção de 28%. Encontra-se em uso de losartana e furosemida. Qual das condutas abaixo tem benefício comprovado na redução de mortalidade para esse paciente?`,
    alternativas: [
      'Aumento da dose do diurético de alça.',
      'Prescrição de sacubitril/valsartana em substituição à losartana.',
      'Adição de antagonista de canal de cálcio à terapêutica atual.',
      'Adição de digoxina à terapêutica atual.'
    ],
    correta: 1,
    explicacao: `O quadro é de insuficiência cardíaca com fração de ejeção reduzida (ICFEr). O uso de sacubitril/valsartana (ARNI) demonstrou redução de mortalidade e hospitalizações por IC em comparação com IECA. Diuréticos são sintomáticos e digoxina reduz hospitalizações, mas não mortalidade.`
  },
  {
    id: 11,
    enunciado: `Homem de 59 anos, com diagnóstico de diabetes mellitus tipo 2 há 12 anos, apresenta proteinúria de 1,2 g/24h e TFG estimada de 52 mL/min/1,73 m². Qual intervenção está associada à redução da progressão da doença renal na situação apresentada?`,
    alternativas: [
      'Prescrição de inibidor do sistema renina-angiotensina.',
      'Restringir ingesta de proteína na dieta para 0,3 g/kg/dia.',
      'Descontinuação da metformina.',
      'Prescrição de furosemida em dose crescente.'
    ],
    correta: 0,
    explicacao: `IECA ou BRA reduzem a pressão intraglomerular e a proteinúria, retardando a progressão da nefropatia diabética. É a intervenção com melhor evidência de nefroproteção em pacientes diabéticos com DRC.`
  },
  {
    id: 12,
    enunciado: `Homem de 28 anos, IMC = 29 kg/m², circunferência abdominal = 102 cm, PA = 138/88 mmHg. Exames: Glicemia de jejum: 110 mg/dL; Triglicerídeos: 190 mg/dL; HDL colesterol: 38 mg/dL. Qual intervenção inicial é mais indicada no cuidado a esse paciente?`,
    alternativas: [
      'Prescrição isolada de estatina.',
      'Mudança no estilo de vida incluindo dieta e atividade física.',
      'Repetir os exames antes de qualquer prescrição.',
      'Prescrição isolada de ciprofibrato para controle de triglicérides.'
    ],
    correta: 1,
    explicacao: `O paciente preenche critérios de síndrome metabólica. A primeira linha de manejo é sempre intervenção no estilo de vida (dieta, atividade física, perda ponderal), antes da introdução de terapia medicamentosa isolada.`
  },
  {
    id: 13,
    enunciado: `Homem de 43 anos, etilista crônico, é admitido com agitação, sudorese profusa, tremores, taquicardia e PA elevada. Relata interrupção do uso de álcool há dois dias. Escala CIWA-Ar: 19 pontos. Qual é a conduta indicada para o paciente na situação descrita?`,
    alternativas: [
      'Realizar reposição de vitamina B12 parenteral a fim de evitar complicações neurológicas.',
      'Iniciar haloperidol endovenoso e solicitar revisão laboratorial com hemograma, eletrólitos, glicemia, função renal e hepática, amilase e CPK.',
      'Prescrever diazepam endovenoso e manter monitorização clínica em regime de internação.',
      'Iniciar clorpromazina via intramuscular para controle da agitação e tremores.'
    ],
    correta: 2,
    explicacao: `CIWA-Ar > 18 indica síndrome de abstinência grave, com risco de delirium tremens. O tratamento de primeira linha são benzodiazepínicos (diazepam ou lorazepam), com necessidade de internação, monitorização e reposição de tiamina. Antipsicóticos não são a terapia de escolha.`
  },
  {
    id: 14,
    enunciado: `Homem de 48 anos, portador de insuficiência cardíaca descompensada, evoluiu com palpitações e PA de 80x50 mmHg. ECG revela Fibrilação Atrial com instabilidade hemodinâmica. Qual a conduta imediata?`,
    alternativas: [
      'Administração de adrenalina.',
      'Prescrição de metoprolol.',
      'Administração de atropina.',
      'Cardioversão.'
    ],
    correta: 3,
    explicacao: `A presença de taquiarritmia (FA) associada à instabilidade hemodinâmica (hipotensão) indica cardioversão elétrica sincronizada imediata como conduta de primeira linha.`
  },
  {
    id: 15,
    enunciado: `Homem de 26 anos procura atendimento por lesões cutâneas (manchas não pruriginosas no tronco, membros e palmas das mãos) há 10 dias. Teste Rápido de Sífilis reagente e VDRL não reagente. Qual é a conduta para este paciente (com manifestações de Sífilis secundária)?`,
    alternativas: [
      'Indicar o tratamento com três doses de Penicilina G Benzatina.',
      'Indicar o tratamento com duas doses de Penicilina G Benzatina.',
      'Indicar o tratamento com uma dose de Penicilina G Benzatina.',
      'Solicitar novo VDRL e, se positivo, indicar o tratamento.'
    ],
    correta: 2,
    explicacao: `Lesões não pruriginosas em tronco e palmas, mais teste treponêmico reagente, são típicos de sífilis secundária. Sífilis primária, secundária e latente recente são tratadas com dose única de Penicilina G Benzatina 2,4 milhões UI IM.`
  },
  {
    id: 16,
    enunciado: `Homem de 43 anos, IMC = 36 kg/m², com glicemia de jejum alterada (115 mg/dL), triglicérides elevados e HDL baixo, além de ronco alto (risco cardiovascular aumentado). Qual a medicação mais indicada para favorecer a perda de peso nesse paciente?`,
    alternativas: [
      'Orlistate.',
      'Inibidor da recaptação de dopamina/noradrenalina (bupropiona).',
      'Agonista do receptor de GLP-1 (semaglutida).',
      'Metformina.'
    ],
    correta: 2,
    explicacao: `O paciente apresenta obesidade grau II e síndrome metabólica. Agonistas de GLP-1 (como semaglutida) promovem perda de peso significativa e melhoram parâmetros metabólicos, com benefício cardiovascular, sendo opção preferencial neste perfil de alto risco.`
  },
  {
    id: 17,
    enunciado: `Homem de 36 anos, com asma intermitente, apresenta dispneia progressiva e sibilância intensa após infecção de vias aéreas superiores recente. A radiografia de tórax é normal. Qual exame auxilia na confirmação da exacerbação asmática desse paciente?`,
    alternativas: [
      'Pico de fluxo expiratório reduzido.',
      'Procalcitonina sérica aumentada.',
      'Gasometria arterial com hipoxemia leve.',
      'Dosagem de IgE total.'
    ],
    correta: 0,
    explicacao: `A medida seriada do pico de fluxo expiratório (PFE) permite avaliar objetivamente o grau de obstrução de vias aéreas, sendo útil na confirmação e monitorização de exacerbações de asma.`
  },
  {
    id: 18,
    enunciado: `Homem de 28 anos, relata febre baixa persistente há 10 dias, sudorese noturna e linfadenopatia cervical bilateral após relações sexuais desprotegidas. Suspeita-se de infecção aguda pelo HIV. Qual é o exame mais indicado para o diagnóstico dessa infecção na fase aguda?`,
    alternativas: [
      'Teste rápido sorológico (teste imunocromatográfico) de detecção de anticorpos circulantes.',
      'Teste sorológico imunoenzimático (ELISA de 4ª geração) de detecção de antígeno p24 e de anticorpos circulantes.',
      'Teste de imunofenotipagem para a determinação da contagem de linfócitos T CD4+.',
      'Teste sorológico pela técnica de imunoblot ou western blot de detecção de anticorpos circulantes.'
    ],
    correta: 1,
    explicacao: `Na infecção aguda pelo HIV, a produção de anticorpos pode não estar completa. O ELISA de 4ª geração detecta simultaneamente o antígeno p24 e anticorpos anti-HIV, reduzindo o período de janela imunológica, sendo o exame de escolha.`
  },
  {
    id: 19,
    enunciado: `Homem de 28 anos, queixa-se de diarreia há 4 meses, dor abdominal, perda de peso (7 kg), e saída de secreção mucopurulenta da região perianal. Investigação revela anemia, deficiência de vitamina B12 e colonoscopia com inflamação segmentar e transmural. Qual o diagnóstico mais provável?`,
    alternativas: [
      'Síndrome do intestino irritável.',
      'Intolerância à lactose.',
      'Doença de Crohn.',
      'Colite ulcerosa.'
    ],
    correta: 2,
    explicacao: `Diarreia crônica, perda de peso, lesão perianal e inflamação segmentar transmural são típicos da Doença de Crohn, uma doença inflamatória intestinal que pode afetar todo o trato digestório, em padrão descontínuo.`
  },
  {
    id: 20,
    enunciado: `Homem de 32 anos procura atendimento por dor torácica recorrente há 3 meses. Dor em aperto, retroesternal, precipitada por esforço físico e aliviada com repouso. Pai teve IAM aos 45 anos. ECG e exames laboratoriais normais. Qual é a conduta diante do quadro clínico desse paciente?`,
    alternativas: [
      'Solicitar cineangiocoronariografia.',
      'Iniciar estatina de alto impacto imediatamente.',
      'Iniciar dupla antiagregação plaquetária.',
      'Solicitar teste ergométrico para avaliação funcional.'
    ],
    correta: 3,
    explicacao: `Dor típica de angina estável em paciente de risco baixo/moderado e com exames basais normais deve ser inicialmente avaliada com teste ergométrico (estratificação funcional não invasiva) para pesquisa de isquemia indutível.`
  },
  {
    id: 21,
    enunciado: `Mulher de 32 anos de idade apresenta diarreia aquosa, com mais de 10 dejeções por dia, sem sangue ou muco. Ela apresenta dores articulares, predominantemente nos joelhos e tornozelos, e revela emagrecimento. A biópsia da mucosa duodenal revelou aumento de linfócitos intraepiteliais, atrofia de vilosidades e hiperplasia de criptas. Qual é o diagnóstico mais provável?`,
    alternativas: [
      'Enterocolite por Campylobacter.',
      'Deficiência de lactase.',
      'Doença celíaca.',
      'Doença de Whipple.'
    ],
    correta: 2,
    explicacao: `A Doença Celíaca cursa com diarreia crônica, perda de peso e manifestações extraintestinais, como artralgias. O padrão histológico típico é atrofia de vilosidades, hiperplasia de criptas e aumento de linfócitos intraepiteliais.`
  },
  {
    id: 22,
    enunciado: `Mulher de 27 anos de idade procura atendimento médico com queixa de perda de peso, sentimento de tristeza constante e falta de “prazer na vida”, além de pensamentos suicidas. Foi diagnosticado transtorno depressivo maior e prescrito o antidepressivo fluoxetina. Por que existe uma demora no início do efeito terapêutico da fluoxetina?`,
    alternativas: [
      'São necessárias algumas semanas para que os auto-receptores sejam dessensibilizados às concentrações sinápticas elevadas de serotonina produzidas pela fluoxetina no tratamento agudo.',
      'São necessárias algumas semanas para que as vesículas pré-sinápticas armazenem concentrações aumentadas de serotonina promovidas pelo tratamento com fluoxetina.',
      'São necessárias algumas semanas para que a fluoxetina diminua a sensibilidade dos receptores de serotonina pós-sinápticos.',
      'São necessárias algumas semanas para que a fluoxetina aumente a síntese de serotonina, por aumento da captação de triptofano pelo neurônio pré-sináptico.'
    ],
    correta: 0,
    explicacao: `A fluoxetina inibe a recaptação de serotonina, aumentando sua concentração sináptica. Inicialmente, há ativação de auto-receptores pré-sinápticos que reduzem a liberação de serotonina. Com o uso contínuo, esses auto-receptores se dessensibilizam, permitindo maior liberação de serotonina e surgimento do efeito antidepressivo após algumas semanas.`
  },
  {
    id: 23,
    enunciado: `Homem de 52 anos de idade é atendido no Pronto Socorro com queixas de diminuição acentuada do volume urinário (oligúria) nos últimos três dias, inchaço nas pernas e cansaço extremo. Ele tem histórico de hipertensão arterial mal controlada e recentemente foi tratado com anti-inflamatórios não esteroides (AINEs). Exames: Creatinina sérica = 4,5 mg/dL; Ureia sérica = 90 mg/dL; Potássio sérico = 5,8 mEq/L. Exame sumário de urina: presença de cilindros granulosos. Qual é o diagnóstico mais provável e o mecanismo fisiopatológico envolvido?`,
    alternativas: [
      'Glomerulonefrite aguda, uma condição inflamatória dos glomérulos renais.',
      'Síndrome nefrótica, condição decorrente de lesões glomerulares.',
      'Nefropatia por AINEs, caracterizada por lesão renal aguda devida à inibição da síntese de prostaglandinas, resultando em vasoconstrição renal e redução do fluxo sanguíneo renal.',
      'Nefropatia diabética, uma complicação crônica do diabetes mellitus.'
    ],
    correta: 2,
    explicacao: `AINEs inibem a síntese de prostaglandinas renais, que são vasodilatadoras, levando à vasoconstrição arteriolar aferente e redução do fluxo sanguíneo renal, com injúria renal aguda. Em paciente hipertenso com uso recente de AINEs e oligúria, a nefropatia por AINEs é o diagnóstico mais provável.`
  },
  {
    id: 24,
    enunciado: `Homem de 32 anos de idade, pintor autônomo, procurou a Unidade Básica de Saúde do bairro com queixa de uma única ferida no corpo que tem aumentado de tamanho. Relata que a ferida apareceu duas semanas após uma pescaria numa região de mata no vale de um rio, há 45 dias. A histopatologia mostrou macrófagos repletos de estruturas intracelulares esféricas e a intradermorreação de Montenegro (IDRM) teve resultado positivo. Qual é o diagnóstico, a forma clínica e o achado mais provável no anatomopatológico?`,
    alternativas: [
      'Leishmaniose tegumentar americana, forma cutânea difusa; foram identificadas formas promastigotas.',
      'Leishmaniose tegumentar americana, forma cutaneomucosa; foram identificadas formas paramastigotas intracelulares.',
      'Leishmaniose tegumentar americana, forma cutânea; a biópsia identificou formas amastigotas intracelulares.',
      'Leishmaniose tegumentar americana, forma mucosa; a biópsia identificou formas amastigotas intracelulares.'
    ],
    correta: 2,
    explicacao: `A Leishmaniose Tegumentar Americana, forma cutânea, cursa com lesão única ou poucas lesões em área de exposição, IDRM positiva e achado de amastigotas intracelulares em macrófagos na biópsia. As promastigotas são formas presentes no vetor (flebótomo).`
  },
  {
    id: 25,
    enunciado: `Homem com 25 anos de idade é portador de hemoglobinopatia e tem internações de repetição por crises álgicas, venoclusivas e necessidade transfusional. A esposa está grávida. A eletroforese de hemoglobina do pai é SS (banda direita) e da mãe é AA (banda esquerda). De acordo com esse resultado, qual é a hemoglobinopatia do paciente e qual o risco do bebê apresentá-la?`,
    alternativas: [
      'Traço falcêmico, sem risco para o bebê.',
      'Traço falcêmico, com 25% de risco para o bebê.',
      'Anemia falciforme, com 50% de risco para o bebê.',
      'Anemia falciforme, sem risco para o bebê.'
    ],
    correta: 3,
    explicacao: `Genótipo SS indica anemia falciforme; AA é normal. A prole obrigatoriamente terá genótipo AS (um alelo S do pai e um A da mãe), ou seja, traço falcêmico. Não há risco de o filho ter anemia falciforme, apenas ser portador.`
  },
  {
    id: 26,
    enunciado: `Homem de 48 anos de idade, enfermeiro de Pronto Socorro, sofreu ferimento acidental da região palmar com cateter sobre agulha de grosso calibre (Abocath 18) em paciente fonte HIV positivo. Doze dias depois o profissional de saúde passou a apresentar febre seguida de mialgia, adenopatia cervical, faringite, exantema e cefaleia. Considerando os estágios de Fiebig e o período de janela imunológica para os diferentes ensaios, qual é o teste mais indicado para investigar a infecção aguda pelo HIV?`,
    alternativas: [
      'Western blot.',
      'Carga viral (HIV RNA PCR).',
      'Antigenemia p24.',
      'Imunoensaio de terceira geração.'
    ],
    correta: 1,
    explicacao: `Entre 10 e 17 dias pós-exposição (Estágio I de Fiebig), o teste que primeiro se torna positivo é o RNA viral (carga viral por PCR). Antígeno p24 e testes sorológicos tornam-se positivos mais tarde.`
  },
  {
    id: 27,
    enunciado: `Mulher de 48 anos de idade foi encaminhada ao serviço de Gastroenterologia pelo achado casual de alterações na cinética do ferro. O teste genético para hemocromatose detectou homozigose para a mutação C282Y. Qual é o parâmetro laboratorial que frequentemente encontra-se reduzido em casos como este?`,
    alternativas: [
      'Ferritina.',
      'Índice de saturação da transferrina.',
      'Capacidade total de ligação do ferro (TIBC).',
      'Ferro sérico.'
    ],
    correta: 2,
    explicacao: `Na hemocromatose há aumento do ferro sérico e da ferritina, com elevado índice de saturação da transferrina. A síntese de transferrina diminui, levando à redução da capacidade total de ligação do ferro (TIBC).`
  },
  {
    id: 28,
    enunciado: `Mulher de 38 anos de idade compareceu a consulta ambulatorial referindo dores articulares limitantes, com edema local e rigidez matinal das mãos, evoluindo há seis meses. Ao exame físico foram evidenciadas tumefações simétricas nas articulações interfalangeanas proximais e metacarpofalangeanas. Detectou-se também elevação das provas inflamatórias (VHS e PCR) e a presença, em altos níveis, de autoanticorpos contra as proteínas com resíduos citrulinados. Confirmou-se a hipótese diagnóstica de uma doença autoimune - artrite reumatoide. Qual é o achado que contribui de maneira mais significativa para o diagnóstico definitivo deste caso?`,
    alternativas: [
      'Os sinais cardinais da inflamação evidenciados no exame físico.',
      'A velocidade de sedimentação globular elevada.',
      'Os níveis elevados da pentraxina de fase aguda; a proteína C reativa.',
      'A detecção de anticorpos contra antígenos autólogos específicos.'
    ],
    correta: 3,
    explicacao: `Na artrite reumatoide, embora VHS e PCR indiquem inflamação, o achado mais específico é a presença de autoanticorpos, como o fator reumatoide e especialmente o anti-CCP, que têm alta especificidade e auxiliam no diagnóstico definitivo.`
  },
  {
    id: 29,
    enunciado: `Mulher de 25 anos de idade apresenta dor abdominal aguda no quadrante inferior direito há aproximadamente 24 horas. A dor migrou para o quadrante inferior direito, tornando-se intensa e contínua. A paciente relata náuseas, vômitos e falta de apetite. Ao exame físico há sensibilidade à palpação no ponto de McBurney, além de defesa muscular localizada. Além da leucocitose com aumento de bastonetes, quais são os achados mais prováveis no hemograma?`,
    alternativas: [
      'Granulações tóxicas, corpúsculos de Döhle e vacúolos citoplasmáticos.',
      'Vacúolos citoplasmáticos, corpos de Heinz e corpúsculos de Howell-Jolly.',
      'Corpos de Heinz, corpúsculos de Howell-Jolly e hastes de Auer.',
      'Corpúsculos de Döhle, vacúolos citoplasmáticos e corpos de Heinz.'
    ],
    correta: 0,
    explicacao: `Na apendicite aguda, processo infeccioso-inflamatório, são comuns alterações reativas dos neutrófilos como granulações tóxicas, corpúsculos de Döhle e vacúolos citoplasmáticos. Corpos de Heinz e Howell-Jolly se associam a outros distúrbios hematológicos; hastes de Auer à leucemia mieloide aguda.`
  },
  {
    id: 30,
    enunciado: `Homem, 63 anos, com doença pulmonar obstrutiva crônica (DPOC) apresenta sintomas de falta de ar e dificuldades respiratórias. Foi à Unidade Básica de Saúde, onde foi prescrito um medicamento para a melhora dos sintomas. Qual é a classe do medicamento que deve ser prescrita para esse paciente e qual o seu mecanismo de ação?`,
    alternativas: [
      'Agonista dos receptores nicotínicos, que atua reduzindo o processo inflamatório e induzindo a vasodilatação, o que contribui para o alívio da dispneia.',
      'Antagonista dos receptores muscarínicos, que promove o relaxamento dos músculos lisos das vias respiratórias, resultando em broncodilatação.',
      'Antagonista dos receptores beta-adrenérgicos, que promove vasoconstrição, redução da inflamação e broncodilatação.',
      'Agonista colinérgico, que promove a redução da produção de muco, melhorando a vascularização e a facilitação da troca gasosa.'
    ],
    correta: 1,
    explicacao: `Antagonistas muscarínicos inalatórios (anticolinérgicos) são fundamentais no tratamento da DPOC. Eles bloqueiam a ação da acetilcolina nos receptores M, promovendo relaxamento da musculatura lisa brônquica e broncodilatação.`
  },
  {
    id: 31,
    enunciado: `Adolescente de 13 anos de idade é atendido na Unidade de Pronto Atendimento com crise moderada de asma, obtendo rápida melhora. Durante a anamnese relatou que as crises são agravadas com a exposição à poeira, pelos de animais e mofo. Hemograma realizado anteriormente mostrou eosinofilia. Qual das explicações a seguir melhor caracteriza o mecanismo de doença relacionado à situação clínica descrita?`,
    alternativas: [
      'É uma doença não inflamatória induzida principalmente por uma reação de hipersensibilidade do tipo 3, com envolvimento de linfócitos Th1, macrófagos, basófilos e eosinófilos, e aumento do nível sérico de IgG.',
      'O paciente apresenta asma brônquica, caracterizada imunologicamente como reação de hipersensibilidade do tipo II, na qual o contato Ag-Ac desencadeia as manifestações clínicas.',
      'Trata-se de uma doença alérgica, em que a resposta imune é desencadeada a partir de uma resposta de células Th1, com produção de interleucinas inflamatórias e produção de IgE.',
      'A resposta imune nos indivíduos alérgicos é do tipo Th2, que é a responsável pela indução da secreção de interleucinas produtoras de IgE e pela eosinofilia observada nesses pacientes.'
    ],
    correta: 3,
    explicacao: `A asma alérgica é uma reação de hipersensibilidade do tipo I, mediada por IgE. A resposta é predominantemente Th2, com produção de IL-4, IL-5 e IL-13, o que estimula produção de IgE e recrutamento de eosinófilos, justificando a eosinofilia.`
  },
  {
    id: 32,
    enunciado: `Mulher de 56 anos de idade queixa-se de fadiga persistente, perda de peso involuntária e episódios de febre noturna nos últimos três meses. Ao exame físico apresenta linfadenopatia generalizada. Os exames laboratoriais revelam anemia normocítica normocrômica, leucocitose com predominância de linfócitos, e trombocitopenia. Qual é o diagnóstico mais provável e a sua base fisiopatológica?`,
    alternativas: [
      'Anemia aplástica; destruição autoimune das células-tronco hematopoiéticas.',
      'Leucemia linfocítica crônica (LLC); acúmulo de linfócitos B maduros, mas funcionalmente incompetentes.',
      'Mieloma múltiplo; proliferação clonal de plasmócitos que produzem imunoglobulinas monoclonais.',
      'Linfoma de Hodgkin; proliferação maligna de linfócitos B com formação de células de Reed-Sternberg.'
    ],
    correta: 1,
    explicacao: `Sintomas B (febre, perda de peso), linfadenopatia generalizada, linfocitose e citopenias periféricas são típicos de leucemia linfocítica crônica, caracterizada pela proliferação clonal de linfócitos B maduros, porém funcionalmente incompetentes.`
  },
  {
    id: 33,
    enunciado: `Mulher de 37 anos de idade foi encaminhada para um ambulatório especializado devido a queixas de agitação, irritabilidade frequente, palpitações e dispneia. O exame físico da paciente mostrava proptose ocular, PA = 110 x 70 mmHg, FC = 112 bpm, edema de membros inferiores (1/4), crepitações bibasais à ausculta pulmonar e bulhas hiperfonéticas. Resultado dos exames realizados: TSH diminuído, T3 e T4 elevados. Quais os mecanismos que melhor explicam o quadro clínico descrito (Hipertireoidismo)?`,
    alternativas: [
      'Diminuição da pressão de enchimento ventricular, taquiarritmias persistentes e diminuição da resistência vascular periférica.',
      'Aumento da pressão de enchimento ventricular, taquicardia persistente e aumento da pré-carga.',
      'Aumento da resistência vascular periférica, diminuição do débito cardíaco e aumento da pré-carga.',
      'Taquiarritmia persistente, diminuição do relaxamento diastólico e aumento do débito cardíaco.'
    ],
    correta: 1,
    explicacao: `No hipertireoidismo ocorre aumento do metabolismo, taquicardia persistente, aumento do volume sanguíneo e do retorno venoso, com elevação da pré-carga e da pressão de enchimento ventricular, podendo levar a insuficiência cardíaca de alto débito e congestão.`
  },
  {
    id: 34,
    enunciado: `Homem de 69 anos de idade, tabagista, com história de hipertensão e diabetes, acorda afásico e plégico em membro superior direito. Sem melhora após 6 horas, foi levado ao Pronto Socorro. A primeira tomografia realizada não demonstrou alteração significativa, apenas um leve apagamento dos sulcos em região frontoparietal esquerda. Após 24 horas foi repetida a tomografia, sendo agora evidente uma área de hipodensidade (relacionada à isquemia) na região frontoparietal esquerda, preservando a porção medial deste hemisfério cerebral. Qual é a artéria responsável pela isquemia cerebral do paciente?`,
    alternativas: [
      'Artéria cerebral posterior esquerda.',
      'Artéria basilar.',
      'Artéria cerebral anterior esquerda.',
      'Artéria cerebral média esquerda.'
    ],
    correta: 3,
    explicacao: `A região frontoparietal lateral é irrigada predominantemente pela artéria cerebral média. O quadro de hemiparesia braquiocrural e afasia (hemisfério dominante esquerdo) é classicamente associado ao território da ACM esquerda.`
  },
  {
    id: 35,
    enunciado: `Mulher de 73 anos de idade, hipertensa, diabética e dislipidêmica, procura Emergência com dor precordial em aperto, irradiada para a mandíbula, sudorese fria, em repouso. PA = 86x64 mmHg; FC = 116 bpm; ECG mostra infradesnivelamento de ST em D2, D3 e aVF. Qual é a conduta mais adequada no tratamento inicial dessa paciente com SCA sem supra de ST?`,
    alternativas: [
      'Trombolítico venoso.',
      'Nitrato venoso.',
      'Betabloqueador oral.',
      'Antiagregação plaquetária oral.'
    ],
    correta: 3,
    explicacao: `A paciente apresenta síndrome coronariana aguda sem supra de ST, com instabilidade hemodinâmica. A antiagregação plaquetária (AAS, P2Y12) deve ser instituída o quanto antes. Nitratos e betabloqueadores podem estar contraindicados diante da hipotensão e sinais de falência cardíaca.`
  },
  {
    id: 36,
    enunciado: `Homem de 35 anos de idade procurou assistência médica com queixa de astenia e náuseas persistentes há aproximadamente 10 dias. O paciente relata ter tido relação sexual desprotegida há 2 meses. Exame físico sem alterações, exceto por hepatomegalia discreta, dolorosa. A avaliação laboratorial mostrou, como única alteração significativa, a elevação dos níveis séricos de alanina aminotransferase (1.500 UI/L) e de aspartato aminotransferase (1.200 U/L). Quais são os marcadores sorológicos que mais provavelmente apresenta esse paciente?`,
    alternativas: [
      'HBsAg, HBeAg e Anti-HBc IgM.',
      'HBsAg, HBeAg e Anti-HBc IgG.',
      'HBsAg, Anti-HBe e Anti-HBc IgM.',
      'HBsAg, Anti-HBc IgG e Anti-HBs.'
    ],
    correta: 0,
    explicacao: `O quadro é compatível com hepatite B aguda. Nessa fase, observa-se HBsAg positivo, HBeAg positivo (alta replicação viral) e Anti-HBc IgM positivo, marcador de infecção recente.`
  },
  {
    id: 37,
    enunciado: `Mulher de 18 anos de idade iniciou há 4 dias quadro de febre alta (39 ºC), cefaleia, dor retrorbitária, náuseas, vômitos, anorexia e dor abdominal. Exames laboratoriais: hemograma com leucopenia e linfopenia. Qual é o exame mais adequado para o diagnóstico dessa paciente?`,
    alternativas: [
      'Pesquisa do antígeno NS-1 do vírus da dengue.',
      'Pesquisa de anticorpos IgG contra o vírus da dengue.',
      'Pesquisa de anticorpos IgM contra o vírus da dengue.',
      'Cultura para o vírus da dengue.'
    ],
    correta: 0,
    explicacao: `O quadro clínico é sugestivo de dengue, e a paciente está no 4º dia de sintomas. O teste ideal neste período é a pesquisa do antígeno NS1, detectável do 1º ao 5º dia de doença. A sorologia IgM é mais útil após o 5º dia.`
  },
  {
    id: 38,
    enunciado: `Homem de 26 anos de idade, fisiculturista, sofreu agressão perpetrada em via pública por quatro desconhecidos, que desferiram contra ele violentos golpes com um porrete de madeira, tendo o paciente utilizado na ocasião principalmente o antebraço direito para defender-se. Três dias depois o paciente retornou à Emergência referindo náuseas e vômitos nas últimas seis horas, adinamia e dor de grande intensidade no antebraço direito, que apresentava edema de grande intensidade, endurecido, já estendendo-se ao terço inferior do braço, com desaparecimento do pulso periférico na região. A avaliação clínico-laboratorial revelou a ocorrência de rabdomiólise severa, com desidratação, urina “cor de chá” (mioglobinúria), nível sérico de creatinofosfoquinase (CPK) muito elevado, sinais de grave comprometimento da função renal – creatinina sérica elevada, azotemia, acidose metabólica.

ESTABELEÇA A MELHOR CORRESPONDÊNCIA:
    1. Síndrome Compartimental
    2. Lesão Muscular
    3. Injúria Renal Aguda
    4. Fisiopatologia

• (A) Deposição intratubular de mioglobina
• (B) Liberação de potássio, fosfato, ácido úrico e CPK
• (C) Edema, dor intensa e pulso periférico ausente
• (D) Fluxo extracelular de sódio e cálcio
• (E) Lesão muscular aguda
• (F) Lise da membrana celular
• (G) Necrose tubular aguda
• (H) Hipercalemia e acidose metabólica

As alternativas são:
A) 1 – E, F; 2 – B, C; 3 – G, H; 4 – D, H
B) 1 – E, F; 2 – B, C; 3 – D, H; 4 – A, H
C) 1 – C, F; 2 – B, E; 3 – D, H; 4 – A, G
D) 1 – C, E; 2 – B, F; 3 – A, G; 4 – D, H`,
    alternativas: [
      '1 – E, F; 2 – B, C; 3 – G, H; 4 – D, H',
      '1 – E, F; 2 – B, C; 3 – D, H; 4 – A, H',
      '1 – C, F; 2 – B, E; 3 – D, H; 4 – A, G',
      '1 – C, E; 2 – B, F; 3 – A, G; 4 – D, H'
    ],
    correta: 3,
    explicacao: `O quadro é de rabdomiólise complicada com síndrome compartimental e injúria renal aguda.

– 1. Síndrome Compartimental: edema, dor intensa e ausência de pulso (C) decorrentes de lesão muscular aguda (E).
– 2. Lesão Muscular: lise da membrana celular (F) resultando em liberação de potássio, fosfato, ácido úrico e CPK (B).
– 3. Injúria Renal Aguda: deposição intratubular de mioglobina (A) levando à necrose tubular aguda (G).
– 4. Fisiopatologia: alterações iônicas com fluxo anormal de Na+ e Ca2+ (D) culminando em hipercalemia e acidose metabólica (H).`
  },
  {
    id: 39,
    enunciado: `Homem de 56 anos de idade, com hipertensão arterial sistêmica de longa data, em tratamento irregular com losartana, e diabetes mellitus do tipo 2 há 10 anos, em uso irregular de metformina, solicita visita domiciliar ao médico de família da Unidade Básica de Saúde (UBS) por não conseguir deambular, devido a dor de forte intensidade na articulação metatarsofalangiana do primeiro pododáctilo esquerdo, com início súbito na madrugada anterior. Refere quadros semelhantes desde os 35 anos de idade, que estão se tornando mais frequentes ultimamente. Nega febre. Refere libação alimentar e alcoólica há 12 horas. Exame físico: sinais flogísticos na articulação metatarsofalangiana e nódulos cutâneos endurecidos em faces extensoras das mãos e hélices auriculares. Qual é a conduta terapêutica indicada para o paciente?`,
    alternativas: [
      'Anti-inflamatório não hormonal e colchicina.',
      'Anti-inflamatório esteroidal e diurético de alça.',
      'Anti-inflamatório esteroidal e diurético tiazídico.',
      'Anti-inflamatório não hormonal e uricosúricos.'
    ],
    correta: 0,
    explicacao: `O quadro clínico é de gota aguda com tofos (nódulos de ácido úrico). O tratamento da crise aguda visa alívio da inflamação e da dor, sendo AINEs e colchicina terapias de primeira linha. Uricosúricos e ajustes de medicação crônica não devem ser iniciados durante a crise.`
  },
  {
    id: 40,
    enunciado: `Mulher de 30 anos de idade foi encaminhada ao ambulatório especializado devido a queixas de febre (T = 38 °C) há 15 dias, poliartralgia, indisposição generalizada, humor deprimido e placas eritematosas fotossensíveis. A paciente relata que nos últimos 7 dias percebeu redução significativa do volume urinário e urina "bastante espumosa". Qual é a alteração laboratorial mais provável dessa paciente?`,
    alternativas: [
      'Leucocitose, VHS aumentado, hipercomplementenemia e bacteriúria intensa.',
      'Leucopenia, VHS normal, normocomplementenemia e hematúria.',
      'Leucocitose, VHS normal, hipocomplementenemia e bacteriúria intensa.',
      'Leucopenia, VHS aumentado, hipocomplementenemia e proteinúria 3+/4+.'
    ],
    correta: 3,
    explicacao: `O quadro é compatível com lúpus eritematoso sistêmico (LES) com nefrite lúpica: rash fotossensível, febre, poliartralgia, sintomas sistêmicos e sinais de comprometimento renal (urina espumosa, oligúria). Achados laboratoriais típicos incluem leucopenia, VHS elevado, hipocomplementenemia (consumo de complemento) e proteinúria significativa.`
  }
  {
  id: 41,
  enunciado: `DEPRIMEIRA – Homem de 58 anos, hipertenso e tabagista, apresenta PA persistentemente em torno de 168/96 mmHg em múltiplas consultas. Não há lesão de órgão-alvo conhecida. Qual é a classificação da hipertensão arterial e a conduta inicial mais adequada?`,
  alternativas: [
    'Hipertensão estágio 1; apenas mudança de estilo de vida.',
    'Hipertensão estágio 2; iniciar tratamento farmacológico associado a medidas não farmacológicas.',
    'Pré-hipertensão; observação clínica.',
    'Hipertensão estágio 3; iniciar terapia combinada tripla.'
  ],
  correta: 1,
  explicacao: `PA ≥ 160/100 mmHg caracteriza hipertensão estágio 2. A conduta indicada é iniciar tratamento farmacológico associado às mudanças no estilo de vida, mesmo na ausência de lesão de órgão-alvo.`
},
{
  id: 42,
  enunciado: `DEPRIMEIRA – Mulher de 72 anos apresenta dispneia progressiva, síncope aos esforços e sopro sistólico rude em foco aórtico irradiado para carótidas. Qual achado ecocardiográfico confirma o diagnóstico mais provável?`,
  alternativas: [
    'Área valvar aórtica < 1,0 cm².',
    'Fração de ejeção preservada.',
    'Dilatação do átrio esquerdo.',
    'Hipertrofia excêntrica do ventrículo esquerdo.'
  ],
  correta: 0,
  explicacao: `Estenose aórtica grave é definida por área valvar < 1,0 cm². O quadro clínico clássico inclui dispneia, síncope e angina.`
},
{
  id: 43,
  enunciado: `DEPRIMEIRA – Homem de 65 anos, com fibrilação atrial não valvar, hipertensão e diabetes, sem história de sangramento. CHA₂DS₂-VASc = 3. Qual a melhor conduta?`,
  alternativas: [
    'AAS isolado.',
    'Nenhuma anticoagulação.',
    'Anticoagulação oral plena.',
    'Dupla antiagregação plaquetária.'
  ],
  correta: 2,
  explicacao: `CHA₂DS₂-VASc ≥ 2 em homens indica anticoagulação oral plena, preferencialmente com anticoagulante oral direto, salvo contraindicações.`
},
{
  id: 44,
  enunciado: `DEPRIMEIRA – Homem de 54 anos com dor torácica típica há 2 horas, ECG com supra de ST em D2, D3 e aVF. Qual é a artéria mais provavelmente acometida?`,
  alternativas: [
    'Artéria descendente anterior.',
    'Artéria circunflexa.',
    'Artéria coronária direita.',
    'Tronco da coronária esquerda.'
  ],
  correta: 2,
  explicacao: `Infarto inferior (D2, D3, aVF) está mais frequentemente relacionado à oclusão da artéria coronária direita.`
},
{
  id: 45,
  enunciado: `DEPRIMEIRA – Paciente com insuficiência cardíaca apresenta fração de ejeção de 60%, dispneia aos esforços e hipertensão de longa data. Qual o tipo de IC e mecanismo predominante?`,
  alternativas: [
    'ICFEr; disfunção sistólica.',
    'HFpEF; disfunção diastólica.',
    'ICFEr; aumento da pré-carga.',
    'HFpEF; redução do débito cardíaco por hipovolemia.'
  ],
  correta: 1,
  explicacao: `HFpEF (IC com fração de ejeção preservada) ocorre por disfunção diastólica, frequentemente associada à hipertensão e envelhecimento.`
},
{
  id: 46,
  enunciado: `DEPRIMEIRA – Homem de 40 anos apresenta crise asmática. Pico de fluxo expiratório está em 45% do previsto. Qual a classificação da exacerbação?`,
  alternativas: [
    'Leve.',
    'Moderada.',
    'Grave.',
    'Risco iminente de parada respiratória.'
  ],
  correta: 2,
  explicacao: `PFE < 50% do previsto indica exacerbação grave de asma, exigindo tratamento intensivo.`
},
{
  id: 47,
  enunciado: `DEPRIMEIRA – Mulher de 68 anos com pneumonia adquirida na comunidade apresenta confusão mental, FR = 32 irpm, PA = 88x54 mmHg e ureia elevada. Qual escore e conduta?`,
  alternativas: [
    'CURB-65 = 1; tratamento ambulatorial.',
    'CURB-65 = 2; observação hospitalar.',
    'CURB-65 = 3; internação hospitalar.',
    'CURB-65 = 4; alta com antibiótico oral.'
  ],
  correta: 2,
  explicacao: `Confusão, FR ≥ 30 e hipotensão conferem CURB-65 = 3, indicando internação hospitalar.`
},
{
  id: 48,
  enunciado: `DEPRIMEIRA – Homem com DPOC apresenta gasometria: pH 7,32; PaCO₂ 60 mmHg; HCO₃⁻ 30 mEq/L. Qual o distúrbio?`,
  alternativas: [
    'Acidose respiratória aguda.',
    'Acidose respiratória crônica compensada.',
    'Alcalose metabólica.',
    'Acidose metabólica.'
  ],
  correta: 1,
  explicacao: `DPOC cursa com acidose respiratória crônica com compensação metabólica (bicarbonato elevado).`
},
{
  id: 49,
  enunciado: `DEPRIMEIRA – Mulher de 32 anos com IMC 41 kg/m², DM2 e apneia do sono. Qual tratamento com maior impacto em mortalidade?`,
  alternativas: [
    'Orlistate.',
    'Metformina.',
    'Cirurgia bariátrica.',
    'Dieta hipocalórica isolada.'
  ],
  correta: 2,
  explicacao: `Cirurgia bariátrica apresenta maior impacto em redução de mortalidade e melhora metabólica em obesidade grave.`
},
{
  id: 50,
  enunciado: `DEPRIMEIRA – Paciente diabético apresenta glicemia 42 mg/dL, sudorese e confusão. Está consciente. Conduta imediata?`,
  alternativas: [
    'Glicose EV.',
    'Glucagon IM.',
    'Carboidrato via oral.',
    'Insulina regular.'
  ],
  correta: 2,
  explicacao: `Hipoglicemia em paciente consciente deve ser tratada com carboidrato por via oral.`
},
{
  id: 51,
  enunciado: `DEPRIMEIRA – Homem de 62 anos, diabético e hipertenso, apresenta edema de membros inferiores, estertores bibasais e PA = 90x60 mmHg. Lactato elevado e ecocardiograma com FEVE de 25%. Qual é o diagnóstico e a droga vasoativa de escolha?`,
  alternativas: [
    'Choque hipovolêmico; noradrenalina.',
    'Choque cardiogênico; dobutamina.',
    'Choque séptico; vasopressina.',
    'Choque obstrutivo; adrenalina.'
  ],
  correta: 1,
  explicacao: `O quadro é compatível com choque cardiogênico (baixo débito, congestão pulmonar e hipotensão). A droga inotrópica de escolha é a dobutamina para melhorar o débito cardíaco.`
},
{
  id: 52,
  enunciado: `DEPRIMEIRA – Mulher de 70 anos apresenta fibrilação atrial com resposta ventricular rápida, PA = 85x50 mmHg, dispneia e rebaixamento do nível de consciência. Qual a conduta imediata?`,
  alternativas: [
    'Amiodarona endovenosa.',
    'Metoprolol intravenoso.',
    'Cardioversão elétrica sincronizada.',
    'Digoxina intravenosa.'
  ],
  correta: 2,
  explicacao: `Arritmia associada à instabilidade hemodinâmica indica cardioversão elétrica sincronizada imediata, independentemente do tempo de FA.`
},
{
  id: 53,
  enunciado: `DEPRIMEIRA – Homem de 45 anos com dor torácica súbita, dispneia e taquicardia. Escore de Wells alto. Qual exame diagnóstico deve ser solicitado inicialmente?`,
  alternativas: [
    'D-dímero.',
    'Radiografia de tórax.',
    'Angiotomografia de artérias pulmonares.',
    'Cintilografia pulmonar.'
  ],
  correta: 2,
  explicacao: `Em paciente com alta probabilidade clínica (Wells alto), o exame de escolha é a angiotomografia de artérias pulmonares, sem necessidade prévia de D-dímero.`
},
{
  id: 54,
  enunciado: `DEPRIMEIRA – Gasometria arterial mostra: pH 7,48; PaCO₂ 48 mmHg; HCO₃⁻ 35 mEq/L. Qual é o distúrbio ácido-base primário?`,
  alternativas: [
    'Alcalose metabólica.',
    'Alcalose respiratória.',
    'Acidose metabólica compensada.',
    'Distúrbio misto.'
  ],
  correta: 0,
  explicacao: `pH alcalino com bicarbonato elevado indica alcalose metabólica. A elevação do CO₂ reflete compensação respiratória.`
},
{
  id: 55,
  enunciado: `DEPRIMEIRA – Mulher de 60 anos apresenta hiponatremia de 118 mEq/L, confusão mental e convulsão. Qual a conduta imediata?`,
  alternativas: [
    'Restrição hídrica.',
    'Soro fisiológico 0,9%.',
    'Soro hipertônico a 3%.',
    'Diurético de alça.'
  ],
  correta: 2,
  explicacao: `Hiponatremia grave sintomática é indicação de correção imediata com solução hipertônica a 3%, com monitorização rigorosa.`
},
{
  id: 56,
  enunciado: `DEPRIMEIRA – Homem de 55 anos apresenta creatinina de 3,2 mg/dL após episódio de diarreia intensa. FeNa = 0,4%. Qual o tipo de lesão renal aguda?`,
  alternativas: [
    'LRA pré-renal.',
    'Necrose tubular aguda.',
    'Glomerulonefrite aguda.',
    'LRA pós-renal.'
  ],
  correta: 0,
  explicacao: `FeNa < 1% sugere LRA pré-renal, geralmente associada à hipovolemia, como em diarreia intensa.`
},
{
  id: 57,
  enunciado: `DEPRIMEIRA – Homem alcoólatra crônico apresenta dor epigástrica intensa irradiada para dorso, amilase 4 vezes o valor normal. Qual etiologia mais provável?`,
  alternativas: [
    'Hipercalcemia.',
    'Medicamentos.',
    'Alcoolismo.',
    'Hipertrigliceridemia.'
  ],
  correta: 2,
  explicacao: `Alcoolismo crônico é uma das principais causas de pancreatite aguda, juntamente com litíase biliar.`
},
{
  id: 58,
  enunciado: `DEPRIMEIRA – Paciente cirrótico apresenta ascite, febre e dor abdominal difusa. Paracentese mostra PMN > 250/mm³. Qual conduta imediata?`,
  alternativas: [
    'Alta com antibiótico oral.',
    'Iniciar ceftriaxona intravenosa.',
    'Aguardar cultura do líquido ascítico.',
    'Indicar cirurgia exploradora.'
  ],
  correta: 1,
  explicacao: `O quadro é de peritonite bacteriana espontânea. O tratamento empírico imediato é cefalosporina de 3ª geração, como ceftriaxona.`
},
{
  id: 59,
  enunciado: `DEPRIMEIRA – Homem de 34 anos, HIV positivo sem tratamento, apresenta tosse seca, dispneia progressiva e hipoxemia. TC mostra vidro fosco bilateral. Qual agente mais provável?`,
  alternativas: [
    'Mycobacterium tuberculosis.',
    'Streptococcus pneumoniae.',
    'Pneumocystis jirovecii.',
    'Citomegalovírus.'
  ],
  correta: 2,
  explicacao: `Em pacientes com HIV avançado, pneumonia por Pneumocystis jirovecii cursa com tosse seca, hipoxemia e vidro fosco bilateral.`
},
{
  id: 60,
  enunciado: `DEPRIMEIRA – Homem de 29 anos apresenta úlcera genital indolor, fundo limpo e bordas endurecidas. VDRL não reagente. Qual a melhor conduta?`,
  alternativas: [
    'Aguardar soroconversão.',
    'Tratar como sífilis primária.',
    'Solicitar cultura da lesão.',
    'Prescrever antivirais.'
  ],
  correta: 1,
  explicacao: `Úlcera genital indolor é típica de sífilis primária. Testes não treponêmicos podem ser negativos precocemente; o tratamento não deve ser postergado.`
},
{
  id: 61,
  enunciado: `DEPRIMEIRA – Homem de 66 anos, hipertenso e diabético, apresenta dor torácica em repouso há 30 minutos. ECG sem supra de ST, troponina elevada. Qual o diagnóstico e a estratégia inicial mais adequada?`,
  alternativas: [
    'Angina estável; tratamento ambulatorial.',
    'IAM sem supra de ST; estratificação de risco e terapia antitrombótica.',
    'IAM com supra de ST; trombólise imediata.',
    'Dor torácica não cardíaca; analgesia simples.'
  ],
  correta: 1,
  explicacao: `Dor em repouso associada à elevação de troponina, sem supra de ST, caracteriza IAM sem supra. A conduta inclui antiagregação, anticoagulação e estratificação invasiva conforme risco.`
},
{
  id: 62,
  enunciado: `DEPRIMEIRA – Mulher de 58 anos com insuficiência cardíaca apresenta ganho de peso rápido, edema periférico e ortopneia. Qual medida inicial é prioritária na descompensação aguda?`,
  alternativas: [
    'Introdução de betabloqueador em alta dose.',
    'Ajuste de diurético de alça.',
    'Suspensão de IECA.',
    'Início de digoxina.'
  ],
  correta: 1,
  explicacao: `Na descompensação aguda congestiva da IC, a prioridade é aliviar congestão com diurético de alça. Betabloqueadores não devem ser titulados para cima nesse momento.`
},
{
  id: 63,
  enunciado: `DEPRIMEIRA – Homem de 35 anos com crise convulsiva e histórico de etilismo crônico apresenta Na+ = 108 mEq/L. Qual é o limite seguro de correção do sódio nas primeiras 24 horas?`,
  alternativas: [
    'Até 4 mEq/L.',
    'Até 8 mEq/L.',
    'Até 12 mEq/L.',
    'Correção livre conforme sintomas.'
  ],
  correta: 1,
  explicacao: `A correção da hiponatremia não deve exceder 8 mEq/L em 24 horas para evitar mielinólise pontina, especialmente em pacientes de risco como etilistas.`
},
{
  id: 64,
  enunciado: `DEPRIMEIRA – Homem de 72 anos apresenta oligúria, creatinina elevada e hidronefrose bilateral ao ultrassom. Qual o tipo de lesão renal aguda?`,
  alternativas: [
    'Pré-renal.',
    'Renal parenquimatosa.',
    'Pós-renal.',
    'Glomerular.'
  ],
  correta: 2,
  explicacao: `A presença de hidronefrose bilateral sugere obstrução do trato urinário, caracterizando lesão renal aguda pós-renal.`
},
{
  id: 65,
  enunciado: `DEPRIMEIRA – Mulher de 40 anos apresenta TSH elevado e T4 livre reduzido. Qual a principal causa desse distúrbio em áreas com ingestão adequada de iodo?`,
  alternativas: [
    'Deficiência de iodo.',
    'Doença de Graves.',
    'Tireoidite de Hashimoto.',
    'Adenoma hipofisário.'
  ],
  correta: 2,
  explicacao: `Em áreas iodo-suficientes, a principal causa de hipotireoidismo primário é a tireoidite de Hashimoto, de origem autoimune.`
},
{
  id: 66,
  enunciado: `DEPRIMEIRA – Homem de 50 anos com cirrose alcoólica apresenta confusão mental, inversão do ciclo sono–vigília e asterixe. Qual o tratamento inicial?`,
  alternativas: [
    'Antibiótico de amplo espectro.',
    'Lactulose.',
    'Restrição proteica absoluta.',
    'Diurético de alça.'
  ],
  correta: 1,
  explicacao: `O quadro é de encefalopatia hepática. A lactulose reduz a absorção de amônia e é a base do tratamento inicial.`
},
{
  id: 67,
  enunciado: `DEPRIMEIRA – Homem de 28 anos apresenta diarreia crônica, perda de peso e anticorpos anti-transglutaminase positivos. Qual exame confirma o diagnóstico?`,
  alternativas: [
    'Colonoscopia.',
    'Teste respiratório do hidrogênio.',
    'Biópsia duodenal.',
    'Dosagem de IgE total.'
  ],
  correta: 2,
  explicacao: `O diagnóstico definitivo da doença celíaca é confirmado por biópsia duodenal com atrofia de vilosidades, hiperplasia de criptas e linfocitose intraepitelial.`
},
{
  id: 68,
  enunciado: `DEPRIMEIRA – Paciente internado em UTI evolui com febre após 72 horas de ventilação mecânica. Qual é o diagnóstico mais provável?`,
  alternativas: [
    'Pneumonia adquirida na comunidade.',
    'Pneumonia associada à ventilação mecânica.',
    'Tuberculose pulmonar.',
    'Pneumonite química.'
  ],
  correta: 1,
  explicacao: `Pneumonia que surge após 48 horas de intubação é classificada como pneumonia associada à ventilação mecânica (PAV).`
},
{
  id: 69,
  enunciado: `DEPRIMEIRA – Homem de 44 anos apresenta PCR elevada, febre persistente e hemoculturas positivas para Staphylococcus aureus. Ecocardiograma evidencia vegetação valvar. Qual o diagnóstico?`,
  alternativas: [
    'Miocardite infecciosa.',
    'Endocardite infecciosa.',
    'Pericardite bacteriana.',
    'Sepse de foco indefinido.'
  ],
  correta: 1,
  explicacao: `Bacteremia por S. aureus associada a vegetação valvar ao ecocardiograma define endocardite infecciosa, conforme critérios de Duke.`
},
{
  id: 70,
  enunciado: `DEPRIMEIRA – Homem de 61 anos sofre parada cardiorrespiratória em FV no pronto-socorro. Qual é a conduta imediata segundo ACLS?`,
  alternativas: [
    'Adrenalina imediatamente, antes do choque.',
    'Choque elétrico não sincronizado.',
    'Atropina intravenosa.',
    'Cardioversão sincronizada.'
  ],
  correta: 1,
  explicacao: `Fibrilação ventricular é ritmo chocável. A conduta imediata é desfibrilação (choque não sincronizado), seguida de RCP de alta qualidade.`
},
{
  id: 71,
  enunciado: `DEPRIMEIRA – Homem de 64 anos, tabagista, apresenta dispneia súbita, dor torácica pleurítica e hemoptise discreta. PA = 110x70 mmHg, FC = 118 bpm. Qual achado fortalece o diagnóstico de tromboembolismo pulmonar?`,
  alternativas: [
    'Hiponatremia.',
    'Inversão de onda T em V1–V4.',
    'D-dímero elevado em paciente de alto risco.',
    'Radiografia de tórax normal.'
  ],
  correta: 2,
  explicacao: `Em paciente com alta probabilidade clínica para TEP, o D-dímero elevado reforça a suspeita, embora o exame confirmatório seja a angiotomografia pulmonar.`
},
{
  id: 72,
  enunciado: `DEPRIMEIRA – Mulher de 55 anos apresenta PA = 210x120 mmHg, cefaleia intensa e papiledema ao fundo de olho. Qual é o diagnóstico e a conduta inicial?`,
  alternativas: [
    'Urgência hipertensiva; tratamento oral ambulatorial.',
    'Emergência hipertensiva; redução imediata da PA com droga intravenosa.',
    'Hipertensão estágio 2; observação clínica.',
    'Crise hipertensiva assintomática; ajuste ambulatorial.'
  ],
  correta: 1,
  explicacao: `Papiledema indica lesão aguda de órgão-alvo, caracterizando emergência hipertensiva, que exige tratamento endovenoso e redução controlada da PA.`
},
{
  id: 73,
  enunciado: `DEPRIMEIRA – Homem de 47 anos com insuficiência renal crônica apresenta K+ = 6,8 mEq/L e alterações no ECG. Qual medida NÃO reduz rapidamente o potássio sérico?`,
  alternativas: [
    'Glicose com insulina.',
    'Beta-agonista inalatório.',
    'Gluconato de cálcio.',
    'Hemodiálise.'
  ],
  correta: 2,
  explicacao: `O gluconato de cálcio estabiliza a membrana miocárdica, mas não reduz os níveis séricos de potássio.`
},
{
  id: 74,
  enunciado: `DEPRIMEIRA – Mulher de 29 anos apresenta perda ponderal, tremores, intolerância ao calor e TSH suprimido. Cintilografia mostra captação difusamente aumentada. Qual o diagnóstico?`,
  alternativas: [
    'Tireoidite subaguda.',
    'Doença de Graves.',
    'Adenoma tóxico.',
    'Bócio multinodular tóxico.'
  ],
  correta: 1,
  explicacao: `Captação difusa aumentada à cintilografia é característica da Doença de Graves, principal causa de hipertireoidismo.`
},
{
  id: 75,
  enunciado: `DEPRIMEIRA – Homem de 50 anos apresenta diarreia crônica volumosa, hipocalemia e alcalose metabólica. Qual tumor deve ser suspeitado?`,
  alternativas: [
    'Gastrinoma.',
    'Insulinoma.',
    'VIPoma.',
    'Feocromocitoma.'
  ],
  correta: 2,
  explicacao: `VIPoma cursa com diarreia aquosa volumosa, hipocalemia e acloridria, conhecida como síndrome WDHA.`
},
{
  id: 76,
  enunciado: `DEPRIMEIRA – Paciente com LRA apresenta creatinina progressivamente elevada, cilindros granulosos e FeNa = 3%. Qual o diagnóstico mais provável?`,
  alternativas: [
    'LRA pré-renal.',
    'Necrose tubular aguda.',
    'Glomerulonefrite rapidamente progressiva.',
    'Obstrução urinária.'
  ],
  correta: 1,
  explicacao: `FeNa > 2% associada a cilindros granulosos é típica de necrose tubular aguda, forma de LRA renal intrínseca.`
},
{
  id: 77,
  enunciado: `DEPRIMEIRA – Homem alcoólatra apresenta hematêmese volumosa, PA = 85x55 mmHg. Qual a causa mais provável da hemorragia digestiva alta?`,
  alternativas: [
    'Úlcera gástrica.',
    'Gastrite erosiva.',
    'Varizes esofágicas.',
    'Síndrome de Mallory-Weiss.'
  ],
  correta: 2,
  explicacao: `Em pacientes alcoólatras, especialmente cirróticos, a principal causa de HDA grave é ruptura de varizes esofágicas.`
},
{
  id: 78,
  enunciado: `DEPRIMEIRA – Paciente internado evolui com sepse. PAS = 85 mmHg após reposição volêmica adequada. Qual droga vasoativa de primeira linha?`,
  alternativas: [
    'Dobutamina.',
    'Adrenalina.',
    'Noradrenalina.',
    'Dopamina.'
  ],
  correta: 2,
  explicacao: `Noradrenalina é a droga vasoativa de primeira linha no choque séptico, conforme diretrizes atuais.`
},
{
  id: 79,
  enunciado: `DEPRIMEIRA – Homem de 33 anos apresenta úlcera genital dolorosa, bordas irregulares e base purulenta. Qual o diagnóstico mais provável?`,
  alternativas: [
    'Sífilis primária.',
    'Herpes genital.',
    'Cancro mole.',
    'Linfogranuloma venéreo.'
  ],
  correta: 2,
  explicacao: `Cancro mole (Haemophilus ducreyi) cursa com úlcera genital dolorosa, de base purulenta e bordas irregulares.`
},
{
  id: 80,
  enunciado: `DEPRIMEIRA – Homem de 58 anos apresenta PCR elevada, VHS alto e dor torácica que piora ao deitar e melhora ao sentar. ECG mostra supra difuso de ST. Qual o diagnóstico?`,
  alternativas: [
    'IAM com supra de ST.',
    'Angina instável.',
    'Pericardite aguda.',
    'Dissecção aórtica.'
  ],
  correta: 2,
  explicacao: `Dor torácica pleurítica, alívio ao sentar e supra difuso de ST são achados clássicos de pericardite aguda.`
},
{
  id: 81,
  enunciado: `DEPRIMEIRA – Homem de 70 anos, portador de insuficiência cardíaca, apresenta síncope aos esforços e sopro sistólico rude em foco aórtico. Qual é a principal indicação de intervenção nessa valvopatia?`,
  alternativas: [
    'Área valvar aórtica > 1,5 cm².',
    'Presença de sintomas associados à estenose aórtica.',
    'Hipertrofia ventricular esquerda isolada.',
    'Idade avançada sem comorbidades.'
  ],
  correta: 1,
  explicacao: `Na estenose aórtica, a presença de sintomas (dispneia, síncope ou angina) é a principal indicação de intervenção, independentemente da fração de ejeção.`
},
{
  id: 82,
  enunciado: `DEPRIMEIRA – Mulher de 60 anos apresenta dispneia súbita e queda abrupta da pressão arterial. ECG mostra alternância elétrica. Qual é o diagnóstico mais provável?`,
  alternativas: [
    'Infarto agudo do miocárdio.',
    'Tamponamento cardíaco.',
    'Tromboembolismo pulmonar.',
    'Dissecção aguda de aorta.'
  ],
  correta: 1,
  explicacao: `Alternância elétrica no ECG associada a instabilidade hemodinâmica é sugestiva de tamponamento cardíaco, geralmente por derrame pericárdico volumoso.`
},
{
  id: 83,
  enunciado: `DEPRIMEIRA – Homem de 42 anos apresenta tosse crônica, hemoptise e sudorese noturna. Radiografia de tórax mostra cavitação em ápice pulmonar. Qual exame confirma o diagnóstico?`,
  alternativas: [
    'Sorologia viral.',
    'Baciloscopia do escarro.',
    'Teste tuberculínico (PPD).',
    'Hemocultura.'
  ],
  correta: 1,
  explicacao: `A baciloscopia do escarro é exame diagnóstico inicial para tuberculose pulmonar ativa, especialmente em quadros cavitários.`
},
{
  id: 84,
  enunciado: `DEPRIMEIRA – Gasometria arterial revela: pH 7,28; PaCO₂ 30 mmHg; HCO₃⁻ 14 mEq/L. Qual o distúrbio ácido–base primário?`,
  alternativas: [
    'Acidose metabólica.',
    'Acidose respiratória.',
    'Alcalose respiratória.',
    'Distúrbio misto.'
  ],
  correta: 0,
  explicacao: `pH ácido com bicarbonato reduzido indica acidose metabólica. A queda do CO₂ representa compensação respiratória.`
},
{
  id: 85,
  enunciado: `DEPRIMEIRA – Homem de 52 anos com diabetes tipo 2 apresenta microalbuminúria persistente. Qual medicação tem maior efeito nefroprotetor?`,
  alternativas: [
    'Diurético de alça.',
    'Betabloqueador.',
    'Inibidor da ECA ou BRA.',
    'Insulina basal.'
  ],
  correta: 2,
  explicacao: `IECA ou BRA reduzem a pressão intraglomerular e a proteinúria, retardando a progressão da nefropatia diabética.`
},
{
  id: 86,
  enunciado: `DEPRIMEIRA – Mulher de 34 anos apresenta icterícia, colúria, fezes hipocólicas e fosfatase alcalina elevada. Qual o tipo de icterícia?`,
  alternativas: [
    'Pré-hepática.',
    'Hepática.',
    'Pós-hepática.',
    'Hemolítica.'
  ],
  correta: 2,
  explicacao: `Icterícia obstrutiva (pós-hepática) cursa com colúria, fezes claras e elevação de FA e GGT.`
},
{
  id: 87,
  enunciado: `DEPRIMEIRA – Paciente internado evolui com hipotensão, taquicardia e lactato elevado, sem resposta à reposição volêmica. Qual critério define choque séptico?`,
  alternativas: [
    'PAS < 100 mmHg.',
    'Necessidade de vasopressor para manter PAM ≥ 65 mmHg.',
    'PCR elevada.',
    'Leucocitose.'
  ],
  correta: 1,
  explicacao: `Choque séptico é definido pela necessidade de vasopressor para manter PAM ≥ 65 mmHg e lactato elevado, apesar de reposição volêmica adequada.`
},
{
  id: 88,
  enunciado: `DEPRIMEIRA – Homem de 39 anos apresenta febre alta, mialgia intensa, dor retro-orbitária e leucopenia no 3º dia de doença. Qual exame é mais indicado?`,
  alternativas: [
    'Sorologia IgG.',
    'Sorologia IgM.',
    'Pesquisa do antígeno NS1.',
    'Hemocultura.'
  ],
  correta: 2,
  explicacao: `Nos primeiros dias da dengue (até o 5º dia), o exame mais indicado é a pesquisa do antígeno NS1.`
},
{
  id: 89,
  enunciado: `DEPRIMEIRA – Homem de 45 anos apresenta artrite migratória, febre e antecedente de faringite recente. Qual o diagnóstico mais provável?`,
  alternativas: [
    'Artrite reumatoide.',
    'Febre reumática.',
    'Lúpus eritematoso sistêmico.',
    'Gota.'
  ],
  correta: 1,
  explicacao: `Artrite migratória associada a infecção estreptocócica prévia é manifestação clássica de febre reumática.`
},
{
  id: 90,
  enunciado: `DEPRIMEIRA – Homem de 61 anos em PCR apresenta ritmo de assistolia no monitor. Qual é a conduta segundo o ACLS?`,
  alternativas: [
    'Desfibrilação imediata.',
    'Cardioversão sincronizada.',
    'RCP de alta qualidade e adrenalina.',
    'Atropina intravenosa.'
  ],
  correta: 2,
  explicacao: `Assistolia é ritmo não chocável. A conduta é RCP de alta qualidade associada à administração de adrenalina e identificação das causas reversíveis.`
},
{
  id: 91,
  enunciado: `DEPRIMEIRA – Homem de 59 anos, hipertenso e diabético, apresenta dor torácica típica há 90 minutos. ECG mostra infra de ST em V4–V6 e elevação de troponina. Durante a internação, evolui com edema agudo de pulmão e PA = 85x60 mmHg. Qual estratégia terapêutica modifica prognóstico nesse cenário?`,
  alternativas: [
    'Nitrato endovenoso em alta dose.',
    'Betabloqueador intravenoso precoce.',
    'Estratégia invasiva precoce com cineangiocoronariografia.',
    'Diurético de alça isolado.'
  ],
  correta: 2,
  explicacao: `Trata-se de IAM sem supra de alto risco (instabilidade hemodinâmica e complicação aguda). A estratégia invasiva precoce é a conduta que comprovadamente reduz mortalidade nesse cenário.`
},
{
  id: 92,
  enunciado: `DEPRIMEIRA – Mulher de 74 anos, com FA permanente, CHA₂DS₂-VASc = 5 e HAS-BLED = 4, apresenta sangramento digestivo alto recente já controlado. Qual é a melhor conduta quanto à anticoagulação?`,
  alternativas: [
    'Suspender definitivamente a anticoagulação.',
    'Manter apenas AAS.',
    'Reintroduzir anticoagulação após estabilização clínica.',
    'Trocar anticoagulante por dupla antiagregação.'
  ],
  correta: 2,
  explicacao: `HAS-BLED elevado não contraindica anticoagulação, mas sinaliza risco e necessidade de correção de fatores modificáveis. Em pacientes com alto risco tromboembólico, a anticoagulação deve ser retomada após estabilização.`
},
{
  id: 93,
  enunciado: `DEPRIMEIRA – Homem de 63 anos com IC avançada apresenta dispneia, congestão pulmonar e pressão de pulso estreita. Qual mecanismo fisiopatológico explica esse achado?`,
  alternativas: [
    'Aumento do débito cardíaco.',
    'Redução da resistência vascular sistêmica.',
    'Diminuição do volume sistólico.',
    'Aumento isolado da pré-carga.'
  ],
  correta: 2,
  explicacao: `Na insuficiência cardíaca avançada, a redução do volume sistólico leva à diminuição da pressão sistólica, estreitando a pressão de pulso.`
},
{
  id: 94,
  enunciado: `DEPRIMEIRA – Homem de 45 anos com DPOC apresenta piora súbita da dispneia e aumento abrupto da PaCO₂. Qual mecanismo explica a acidose respiratória aguda sobreposta à crônica?`,
  alternativas: [
    'Redução da complacência pulmonar.',
    'Aumento do espaço morto.',
    'Hipoventilação alveolar aguda.',
    'Alteração da difusão alveolocapilar.'
  ],
  correta: 2,
  explicacao: `A exacerbação aguda do DPOC cursa com hipoventilação alveolar, levando à retenção aguda de CO₂ sobre um quadro crônico previamente compensado.`
},
{
  id: 95,
  enunciado: `DEPRIMEIRA – Gasometria arterial: pH 7,51; PaCO₂ 22 mmHg; HCO₃⁻ 17 mEq/L. Qual a interpretação correta?`,
  alternativas: [
    'Alcalose respiratória com compensação metabólica.',
    'Alcalose metabólica com compensação respiratória.',
    'Distúrbio misto: alcalose respiratória + acidose metabólica.',
    'Erro de coleta.'
  ],
  correta: 2,
  explicacao: `A queda simultânea de CO₂ e bicarbonato com pH alcalino sugere distúrbio misto (alcalose respiratória associada à acidose metabólica), comum em sepse.`
},
{
  id: 96,
  enunciado: `DEPRIMEIRA – Homem de 68 anos, com LRA oligúrica, hipercalemia refratária e acidose metabólica grave, apresenta sinais urêmicos. Qual critério isolado já indica diálise imediata?`,
  alternativas: [
    'Creatinina > 5 mg/dL.',
    'Oligúria persistente.',
    'Hipercalemia refratária.',
    'Ureia elevada.'
  ],
  correta: 2,
  explicacao: `Hipercalemia refratária ao tratamento clínico é critério absoluto para diálise de urgência (AEIOU).`
},
{
  id: 97,
  enunciado: `DEPRIMEIRA – Homem cirrótico apresenta ascite refratária e hiponatremia dilucional. Qual mecanismo fisiopatológico central explica essa alteração?`,
  alternativas: [
    'Perda renal de sódio por lesão tubular.',
    'Ativação do sistema renina-angiotensina-aldosterona.',
    'Redução da produção de albumina.',
    'Aumento isolado da pressão portal.'
  ],
  correta: 1,
  explicacao: `Na cirrose ocorre vasodilatação esplâncnica, reduzindo o volume arterial efetivo e ativando SRAA e ADH, levando à retenção hídrica e hiponatremia dilucional.`
},
{
  id: 98,
  enunciado: `DEPRIMEIRA – Paciente com sepse apresenta disfunção mitocondrial, hiperlactatemia e oferta adequada de oxigênio. Qual conceito explica esse fenômeno?`,
  alternativas: [
    'Hipóxia tecidual clássica.',
    'Choque cardiogênico oculto.',
    'Citopatia hipóxica.',
    'Falência ventilatória.'
  ],
  correta: 2,
  explicacao: `Na sepse ocorre citopatia hipóxica: incapacidade celular de utilizar oxigênio adequadamente, mesmo com oferta preservada, levando à produção de lactato.`
},
{
  id: 99,
  enunciado: `DEPRIMEIRA – Homem de 31 anos apresenta úlcera genital indolor e VDRL negativo. Teste treponêmico é positivo. Qual interpretação correta?`,
  alternativas: [
    'Resultado falso-positivo.',
    'Sífilis secundária.',
    'Sífilis primária em janela imunológica.',
    'Infecção tratada previamente.'
  ],
  correta: 2,
  explicacao: `Na sífilis primária, testes não treponêmicos podem ser negativos inicialmente. O teste treponêmico positivo confirma infecção ativa em fase precoce.`
},
{
  id: 100,
  enunciado: `DEPRIMEIRA – Homem de 56 anos apresenta PCR após IAM extenso. Ritmo no monitor: atividade elétrica sem pulso. Qual é a principal prioridade segundo o ACLS?`,
  alternativas: [
    'Desfibrilação imediata.',
    'Adrenalina antes da RCP.',
    'RCP de alta qualidade e identificação de causas reversíveis.',
    'Cardioversão sincronizada.'
  ],
  correta: 2,
  explicacao: `Atividade elétrica sem pulso é ritmo não chocável. A prioridade é RCP de alta qualidade associada à busca e correção das causas reversíveis (Hs e Ts).`
},
];
