function QuestionViewModel() {
  var self = this;

  self.current = ko.observable(1);
  self.answers = ko.observableArray();

  self.questions = [
    {
      number: 1,
      title: "La question du soutien à domicile s’est posée de façon prioritaire très récemment au Québec.",
      answers: [
        {
          text: "Vrai",
          value: "Vrai"
        },
        {
          text: "Faux",
          value: "Faux"
        }
      ],
      goodAnswer: "Faux",
      infos:
        "Cette tendance a commencé dans les années 1970. Dès lors, le soutien à domicile s’est révélé une priorité pour les gouvernements successifs en matière de vieillissement de la population."
    },
    {
      number: 2,
      title: "En chiffres absolus, combien de personnes se déclarent proches aidantes au Québec",
      answers: [
        {
          text: "1 675 700",
          value: "1 675 700"
        },
        {
          text: "991 500",
          value: "991 500"
        },
        {
          text: "610 400",
          value: "610 400"
        }
      ],
      goodAnswer: "1 675 700",
      infos: "De ce nombre, 965 700 sont des femmes (58 %) et 710 000 des hommes (42 %)."
    },
    {
      number: 3,
      title: "Quelle proportion des femmes québécoises sont proches aidantes?",
      answers: [
        {
          text: "15,9 %",
          value: "15,9 %"
        },
        {
          text: "28,6 %",
          value: "28,6 %"
        },
        {
          text: "48,7 %",
          value: "48,7 %"
        }
      ],
      goodAnswer: "28,6 %",
      infos: ""
    },
    {
      number: 4,
      title: "On retrouve la plus grande proportion de personnes proches aidantes chez…",
      answers: [
        {
          text: "Les femmes de 55 à 64 ans",
          value: "Les femmes de 55 à 64 ans"
        },
        {
          text: "Les hommes de 55 à 64 ans",
          value: "Les hommes de 55 à 64 ans"
        },
        {
          text: "Les femmes de 65 ans et plus",
          value: "Les femmes de 65 ans et plus"
        },
        {
          text: "Les hommes de 65 ans et plus",
          value: "Les hommes de 65 ans et plus"
        }
      ],
      goodAnswer: "Les femmes de 55 à 64 ans",
      infos: ""
    },
    {
      number: 5,
      title: "Combien de femmes et d’hommes s’occupent de leurs parents ou de leurs beaux-parents?",
      answers: [
        {
          text: "204 000 femmes et 204 000 hommes",
          value: "204 000 femmes et 204 000 hommes"
        },
        {
          text: "296 000 femmes et 402 700 hommes",
          value: "296 000 femmes et 402 700 hommes"
        },
        {
          text: "402 700 femmes et 296 000 hommes",
          value: "402 700 femmes et 296 000 hommes"
        }
      ],
      goodAnswer: "402 700 femmes et 296 000 hommes",
      infos: ""
    },
    {
      number: 6,
      title: "Le travail des proches aidantes est marqué par une plus grande polyvalence dans les tâches",
      answers: [
        {
          text: "Vrai",
          value: "Vrai"
        },
        {
          text: "Faux",
          value: "Faux"
        }
      ],
      goodAnswer: "Vrai",
      infos:
        "Les femmes sont plus nombreuses que les hommes à exercer l’ensemble des types de soins, à l’exception de l’entretien de la maison (rénovation, réparations). Ce qui implique de devoir y consacrer plus de temps, et de devoir jongler avec des responsabilités qui exigent une implication mentale et émotionnelle plus grande."
    },
    {
      number: 7,
      title:
        "Les hommes trouvent beaucoup plus de gratification que les femmes dans leurs responsabilités de proche aidance",
      answers: [
        {
          text: "Vrai",
          value: "Vrai"
        },
        {
          text: "Faux",
          value: "Faux"
        }
      ],
      goodAnswer: "Faux",
      infos: ""
    },
    {
      number: 8,
      title:
        "Les responsabilités de proche aidance ont des conséquences plus importantes dans l’organisation du temps des femmes que dans celle des hommes",
      answers: [
        {
          text: "Vrai",
          value: "Vrai"
        },
        {
          text: "Faux",
          value: "Faux"
        }
      ],
      goodAnswer: "Vrai",
      infos:
        "Les femmes en situation de proche aidance rapportent dans une plus grande proportion que les hommes avoir moins de temps pour leurs activités personnelles ou pour passer du temps avec les membres de leur famille et leurs amies et amis."
    },
    {
      number: 9,
      title:
        "Approximativement quel pourcentage des proches aidants et des proches aidantes se prévalent d’un crédit d’impôt pour aidant naturel du fédéral?",
      answers: [
        {
          text: "3,4 %",
          value: "3,4 %"
        },
        {
          text: "10,7 %",
          value: "10,7 %"
        },
        {
          text: "30,1 %",
          value: "30,1 %"
        }
      ],
      goodAnswer: "3,4 %",
      infos: ""
    }
  ];

  self.showNext = ko.computed(function() {
    return self.current() !== self.questions.length;
  });
  self.showPrev = ko.computed(function() {
    return self.current() !== 1;
  });

  self.nextQuestion = function() {
    self.current(self.current() + 1);
    console.log(self.answers());
  };

  self.prevQuestion = function() {
    self.current(self.current() - 1);
  };

  self.currentQuestion = function(number) {
    return "Question " + number + " sur " + self.questions.length;
  };

  self.currentQuestionTitle = function(title, number) {
    return (
      title + (self.questions[number].infos ? "&nbsp; <i class='fa fa-question-circle' aria-hidden='true'></i>" : "")
    );
  };
}

ko.applyBindings(new QuestionViewModel());
