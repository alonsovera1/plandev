export const methodologies = {
  scrum: {
    title: "Scrum",
    description: "Metodolog\u00EDa \u00E1gil que impulsa iteraciones cortas y la adaptaci\u00F3n continua.",
    roles: [
      {
        name: "Product Owner",
        description: "Maximiza el valor del producto gestionando el backlog y priorizando tareas.",
        profiles: [
          "Analista de Negocios",
          "Gerente de Producto",
          "Especialista en Dominio"
        ]
      },
      {
        name: "Scrum Master",
        description: "Facilita el proceso Scrum, resuelve impedimentos y fomenta la mejora continua.",
        profiles: [
          "Coach \u00C1gil",
          "Facilitador",
          "Resolutor de Problemas"
        ]
      },
      {
        name: "Development Team",
        description: "Equipo autoorganizado y multifuncional encargado de desarrollar, testear y entregar el producto.",
        profiles: [
          "Programador Backend",
          "Programador Frontend",
          "Ingeniero Full-stack",
          "QA/Tester"
        ]
      }
    ]
  },
  kanban: {
    title: "Kanban",
    description: "Metodolog\u00EDa que visualiza el flujo de trabajo y limita el trabajo en curso para mejorar la eficiencia.",
    roles: [
      {
        name: "Gestor de Flujo",
        description: "Monitorea y optimiza el flujo de tareas.",
        // En kanban pueden no requerirse sub-especializaciones tan detallas
        profiles: []
      },
      {
        name: "Equipo de Desarrollo",
        description: "Realiza las tareas utilizando el tablero Kanban para gestionar prioridades.",
        profiles: [
          "Programador (General)",
          "Tester"
        ]
      },
      {
        name: "Stakeholder",
        description: "Proporciona feedback y valida el avance del trabajo.",
        profiles: []
      }
    ]
  },
  xp: {
    title: "XP (Extreme Programming)",
    description: "Metodolog\u00EDa que enfatiza la calidad del c\u00F3digo a trav\u00E9s de pruebas frecuentes y la comunicaci\u00F3n estrecha en el equipo.",
    roles: [
      {
        name: "Coach",
        description: "Gu\u00EDa al equipo en las pr\u00E1cticas de XP.",
        profiles: []
      },
      {
        name: "Programador",
        description: "Desarrolla el c\u00F3digo de alta calidad con retroalimentaci\u00F3n continua.",
        profiles: [
          "Especialista Backend",
          "Especialista Frontend"
        ]
      },
      {
        name: "Tester",
        description: "Asegura que el producto cumple con los requerimientos mediante pruebas constantes.",
        profiles: []
      }
    ]
  },
  designThinking: {
    title: "Design Thinking",
    description: "Un enfoque centrado en el usuario que fomenta la innovaci\u00F3n a trav\u00E9s de la empatia, la ideaci\u00F3n y la iteraci\u00F3n.",
    roles: [
      {
        name: "Investigador",
        description: "Identifica las necesidades y problemas de los usuarios.",
        profiles: []
      },
      {
        name: "Dise\u00F1ador",
        description: "Crea soluciones innovadoras y dise\u00F1a la experiencia del usuario.",
        profiles: [
          "Dise\u00F1ador UX",
          "Dise\u00F1ador UI"
        ]
      },
      {
        name: "Facilitador",
        description: "Gu\u00EDa el proceso creativo y asegura la colaboración entre los miembros del equipo.",
        profiles: []
      }
    ]
  }
};
