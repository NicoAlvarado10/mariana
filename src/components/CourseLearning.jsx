// components/CourseLearning.jsx
import { useState, useEffect } from 'react';
import { Menu, X, Home, BookOpen, User, Check, ChevronDown, ChevronRight, Play, FileText, Video, Plus, Edit2, Trash2, Save, XCircle, Link as LinkIcon, Upload, Calendar, Users, Video as VideoIcon, Link2 } from 'lucide-react';
import './course-learning.css';

function CourseLearning({ course, user, enrolledCourses, onGoToCourse, onBackToHome }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [expandedModules, setExpandedModules] = useState([0]);
  const [completedLessons, setCompletedLessons] = useState({});
  const [courseModules, setCourseModules] = useState(course.modules);
  const [lessonContents, setLessonContents] = useState({});
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLessonIndex, setEditingLessonIndex] = useState(null);
  
  // New state for webinar creation
  const [creationType, setCreationType] = useState('module'); // 'module' or 'webinar'
  
  // Form states
  const [newModule, setNewModule] = useState({
    title: '',
    lessons: [{
      title: '',
      contents: []
    }]
  });
  
  const [newWebinar, setNewWebinar] = useState({
    title: '',
    description: '',
    youtubeLink: '',
    meetingLinks: [{
      platform: 'Zoom',
      link: '',
      password: ''
    }],
    date: '',
    time: ''
  });

  const [currentLessonContent, setCurrentLessonContent] = useState({
    type: 'text',
    title: '',
    description: '',
    content: ''
  });

  const [editContent, setEditContent] = useState({
    contents: []
  });

  const [tempContent, setTempContent] = useState({
    type: 'text',
    title: '',
    description: '',
    content: ''
  });

  const isAdmin = true;

  // Initialize default webinar content for existing webinar modules
  useEffect(() => {
    const initializeDefaultWebinars = () => {
      const updatedContents = { ...lessonContents };
      let hasChanges = false;

      courseModules.forEach((module, moduleIdx) => {
        // Check if this is a webinar module (contains 🎥 emoji or "Webinar" in title)
        if (module.title.includes('🎥') || module.title.includes('Webinar')) {
          module.topics.forEach((topic, topicIdx) => {
            const key = `${moduleIdx}-${topicIdx}`;
            
            // Only initialize if content doesn't exist
            if (!updatedContents[key]) {
              const webinarContent = getDefaultWebinarContent(module.title, topic);
              updatedContents[key] = webinarContent;
              hasChanges = true;
            }
          });
        }
      });

      if (hasChanges) {
        setLessonContents(updatedContents);
      }
    };

    initializeDefaultWebinars();
  }, [courseModules]);

  // Function to get default webinar content based on module title
  const getDefaultWebinarContent = (moduleTitle, topic) => {
    const baseWebinarContent = [
      {
        type: 'text',
        title: 'Información del Webinar',
        description: 'Detalles y enlaces de acceso al webinar en vivo',
        content: `
          <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 16px; margin-bottom: 20px;">
            <h3 style="color: #0369a1; margin-top: 0;">🎯 ${topic}</h3>
            <p style="margin-bottom: 8px;"><strong>📅 Fecha:</strong> Próximamente - Por definir</p>
            <p style="margin-bottom: 8px;"><strong>⏰ Hora:</strong> Por confirmar</p>
            <p style="margin-bottom: 8px;"><strong>📝 Descripción:</strong> Este webinar forma parte del curso "${course.title}" y está diseñado para profundizar en los conceptos clave del módulo.</p>
            <p style="margin-bottom: 0;"><strong>👨‍🏫 Instructor:</strong> Mariana Abdala - Crystal Research</p>
          </div>
        `
      },
      {
        type: 'video',
        title: 'Video Introductorio',
        description: 'Conoce los objetivos y estructura del webinar',
        content: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      {
        type: 'text',
        title: 'Material de Preparación',
        description: 'Recursos recomendados antes del webinar',
        content: `
          <h3>📋 Preparación Requerida</h3>
          <p>Para aprovechar al máximo este webinar, te recomendamos:</p>
          <ul>
            <li>Revisar el material del módulo anterior</li>
            <li>Tener a mano tus notas y preguntas</li>
            <li>Contar con una conexión estable a internet</li>
            <li>Usar auriculares para mejor calidad de audio</li>
          </ul>
          
          <h3>🎯 Objetivos de Aprendizaje</h3>
          <p>Al finalizar este webinar podrás:</p>
          <ul>
            <li>Comprender los conceptos fundamentales presentados</li>
            <li>Aplicar las mejores prácticas discutidas</li>
            <li>Resolver dudas específicas con el instructor</li>
            <li>Interactuar con otros participantes del curso</li>
          </ul>
          
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0;">
            <h4 style="color: #92400e; margin-top: 0;">💡 Recordatorio Importante</h4>
            <p style="margin: 0; color: #92400e;">Los enlaces de acceso al webinar en vivo se compartirán por email y en el grupo de WhatsApp 24 horas antes del evento.</p>
          </div>
        `
      }
    ];

    // Customize content based on module type
    if (moduleTitle.includes('Ensayo Clínico')) {
      baseWebinarContent[0].content = baseWebinarContent[0].content.replace(
        'Por confirmar',
        '15 de Diciembre 2024 - 18:00 (GMT-3)'
      );
    } else if (moduleTitle.includes('Comunicación Médica')) {
      baseWebinarContent[0].content = baseWebinarContent[0].content.replace(
        'Por confirmar',
        '20 de Diciembre 2024 - 17:00 (GMT-3)'
      );
    } else if (moduleTitle.includes('Negociación')) {
      baseWebinarContent[0].content = baseWebinarContent[0].content.replace(
        'Por confirmar',
        '22 de Diciembre 2024 - 16:00 (GMT-3)'
      );
    } else if (moduleTitle.includes('Gestión de Datos')) {
      baseWebinarContent[0].content = baseWebinarContent[0].content.replace(
        'Por confirmar',
        '18 de Diciembre 2024 - 15:00 (GMT-3)'
      );
    }

    return baseWebinarContent;
  };

  const toggleModule = (idx) => {
    if (expandedModules.includes(idx)) {
      setExpandedModules(expandedModules.filter(i => i !== idx));
    } else {
      setExpandedModules([...expandedModules, idx]);
    }
  };

  const toggleLessonComplete = (moduleIdx, lessonIdx) => {
    const key = `${moduleIdx}-${lessonIdx}`;
    setCompletedLessons({
      ...completedLessons,
      [key]: !completedLessons[key]
    });
  };

  const isLessonCompleted = (moduleIdx, lessonIdx) => {
    return completedLessons[`${moduleIdx}-${lessonIdx}`] || false;
  };

  const calculateProgress = () => {
    const totalLessons = courseModules.reduce((acc, mod) => acc + mod.topics.length, 0);
    const completed = Object.keys(completedLessons).filter(k => completedLessons[k]).length;
    return Math.round((completed / totalLessons) * 100);
  };

  // CREATE MODULE FUNCTIONS
  const addLessonToNewModule = () => {
    setNewModule({
      ...newModule,
      lessons: [...newModule.lessons, { title: '', contents: [] }]
    });
  };

  const updateLessonTitle = (idx, value) => {
    const updatedLessons = [...newModule.lessons];
    updatedLessons[idx].title = value;
    setNewModule({
      ...newModule,
      lessons: updatedLessons
    });
  };

  const removeLesson = (idx) => {
    const updatedLessons = newModule.lessons.filter((_, i) => i !== idx);
    setNewModule({
      ...newModule,
      lessons: updatedLessons.length > 0 ? updatedLessons : [{ title: '', contents: [] }]
    });
  };

  const openLessonContentEditor = (lessonIdx) => {
    setEditingLessonIndex(lessonIdx);
    setCurrentLessonContent({
      type: 'text',
      title: '',
      description: '',
      content: ''
    });
  };

  const addContentToLesson = () => {
    if (!currentLessonContent.title || !currentLessonContent.content) return;
    
    const updatedLessons = [...newModule.lessons];
    updatedLessons[editingLessonIndex].contents.push({ ...currentLessonContent });
    setNewModule({
      ...newModule,
      lessons: updatedLessons
    });
    setCurrentLessonContent({
      type: 'text',
      title: '',
      description: '',
      content: ''
    });
  };

  const removeContentFromLesson = (lessonIdx, contentIdx) => {
    const updatedLessons = [...newModule.lessons];
    updatedLessons[lessonIdx].contents.splice(contentIdx, 1);
    setNewModule({
      ...newModule,
      lessons: updatedLessons
    });
  };

  const handleCreateModule = () => {
    if (!newModule.title || newModule.lessons[0].title === '') return;
    
    const filteredLessons = newModule.lessons.filter(l => l.title.trim() !== '');
    const newModuleData = {
      title: newModule.title,
      topics: filteredLessons.map(l => l.title)
    };
    
    setCourseModules([...courseModules, newModuleData]);
    
    // Save lesson contents
    const moduleIdx = courseModules.length;
    filteredLessons.forEach((lesson, lessonIdx) => {
      const key = `${moduleIdx}-${lessonIdx}`;
      if (lesson.contents.length > 0) {
        setLessonContents(prev => ({
          ...prev,
          [key]: lesson.contents
        }));
      }
    });
    
    setNewModule({ title: '', lessons: [{ title: '', contents: [] }] });
    setShowCreateModal(false);
    setEditingLessonIndex(null);
  };

  // WEBINAR FUNCTIONS
  const addMeetingLink = () => {
    setNewWebinar({
      ...newWebinar,
      meetingLinks: [...newWebinar.meetingLinks, { platform: 'Zoom', link: '', password: '' }]
    });
  };

  const updateMeetingLink = (index, field, value) => {
    const updatedLinks = [...newWebinar.meetingLinks];
    updatedLinks[index][field] = value;
    setNewWebinar({
      ...newWebinar,
      meetingLinks: updatedLinks
    });
  };

  const removeMeetingLink = (index) => {
    const updatedLinks = newWebinar.meetingLinks.filter((_, i) => i !== index);
    setNewWebinar({
      ...newWebinar,
      meetingLinks: updatedLinks.length > 0 ? updatedLinks : [{ platform: 'Zoom', link: '', password: '' }]
    });
  };

  const handleCreateWebinar = () => {
    if (!newWebinar.title) return;
    
    // Crear contenido del webinar
    const webinarContents = [];
    
    // Agregar información del webinar como contenido de texto
    webinarContents.push({
      type: 'text',
      title: 'Información del Webinar',
      description: 'Detalles y enlaces de acceso al webinar en vivo',
      content: `
        <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 16px; margin-bottom: 20px;">
          <h3 style="color: #0369a1; margin-top: 0;">🎯 ${newWebinar.title}</h3>
          <p style="margin-bottom: 8px;"><strong>📅 Fecha:</strong> ${newWebinar.date || 'Por definir'}</p>
          <p style="margin-bottom: 8px;"><strong>⏰ Hora:</strong> ${newWebinar.time || 'Por definir'}</p>
          ${newWebinar.description ? `<p style="margin-bottom: 8px;"><strong>📝 Descripción:</strong> ${newWebinar.description}</p>` : ''}
          <p style="margin-bottom: 0;"><strong>👨‍🏫 Instructor:</strong> Mariana Abdala - Crystal Research</p>
        </div>
      `
    });
    
    // Agregar enlace de YouTube si existe
    if (newWebinar.youtubeLink) {
      // Convertir enlace de YouTube a embed
      const youtubeEmbed = newWebinar.youtubeLink
        .replace('watch?v=', 'embed/')
        .replace('youtu.be/', 'youtube.com/embed/');
      
      webinarContents.push({
        type: 'video',
        title: 'Transmisión en Vivo - YouTube',
        description: 'Únete al webinar en vivo a través de YouTube',
        content: youtubeEmbed
      });
    }
    
    // Agregar enlaces de reunión
    if (newWebinar.meetingLinks.some(link => link.link)) {
      let meetingLinksHTML = '<div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin-bottom: 20px;">';
      meetingLinksHTML += '<h3 style="color: #047857; margin-top: 0;">🔗 Enlaces de Reunión</h3>';
      
      newWebinar.meetingLinks.forEach((link, index) => {
        if (link.link) {
          meetingLinksHTML += `
            <div style="margin-bottom: 12px; padding: 12px; background: white; border-radius: 8px;">
              <h4 style="margin: 0 0 8px 0; color: #1f2937;">${link.platform}</h4>
              <p style="margin: 4px 0;"><strong>Enlace:</strong> 
                <a href="${link.link}" target="_blank" style="color: #3b82f6; text-decoration: none;">
                  ${link.link}
                </a>
              </p>
              ${link.password ? `<p style="margin: 4px 0;"><strong>Contraseña:</strong> <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${link.password}</code></p>` : ''}
            </div>
          `;
        }
      });
      
      meetingLinksHTML += '</div>';
      
      webinarContents.push({
        type: 'text',
        title: 'Acceso a Plataformas',
        description: 'Enlaces directos para unirte al webinar',
        content: meetingLinksHTML
      });
    }
    
    // Agregar material de preparación
    webinarContents.push({
      type: 'text',
      title: 'Material de Preparación',
      description: 'Recursos recomendados antes del webinar',
      content: `
        <h3>📋 Preparación Requerida</h3>
        <p>Para aprovechar al máximo este webinar, te recomendamos:</p>
        <ul>
          <li>Revisar el material del módulo anterior</li>
          <li>Tener a mano tus notas y preguntas</li>
          <li>Contar con una conexión estable a internet</li>
          <li>Usar auriculares para mejor calidad de audio</li>
        </ul>
        
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0;">
          <h4 style="color: #92400e; margin-top: 0;">💡 Recordatorio Importante</h4>
          <p style="margin: 0; color: #92400e;">Te recomendamos unirte 5 minutos antes del inicio para verificar tu conexión y audio.</p>
        </div>
      `
    });
    
    // Crear el módulo del webinar
    const webinarModule = {
      title: `🎥 ${newWebinar.title}`,
      topics: [`Webinar: ${newWebinar.title}`]
    };
    
    // Agregar a los módulos del curso
    setCourseModules([...courseModules, webinarModule]);
    
    // Guardar el contenido del webinar
    const moduleIdx = courseModules.length;
    const lessonIdx = 0;
    const key = `${moduleIdx}-${lessonIdx}`;
    
    setLessonContents(prev => ({
      ...prev,
      [key]: webinarContents
    }));
    
    // Reset form
    setNewWebinar({
      title: '',
      description: '',
      youtubeLink: '',
      meetingLinks: [{ platform: 'Zoom', link: '', password: '' }],
      date: '',
      time: ''
    });
    
    setShowCreateModal(false);
  };

  // Función para cargar el ejemplo por defecto
  const loadDefaultWebinarExample = () => {
    setNewWebinar({
      title: 'Introducción a React Hooks - Webinar en Vivo',
      description: 'Aprende los fundamentos de React Hooks en este webinar interactivo. Cubriremos useState, useEffect, y custom hooks con ejemplos prácticos.',
      youtubeLink: 'https://www.youtube.com/watch?v=Dx5qFachd3A',
      meetingLinks: [
        {
          platform: 'Zoom',
          link: 'https://zoom.us/j/123456789',
          password: 'react2024'
        },
        {
          platform: 'Google Meet',
          link: 'https://meet.google.com/abc-defg-hij',
          password: ''
        }
      ],
      date: '2024-12-15',
      time: '18:00'
    });
  };

  // EDIT FUNCTIONS
  const handleOpenEditModal = () => {
    const key = `${selectedModule}-${selectedLesson}`;
    const currentContents = lessonContents[key] || getDefaultLessonContent(selectedModule, selectedLesson);
    setEditContent({
      contents: Array.isArray(currentContents) ? [...currentContents] : [currentContents]
    });
    setShowEditModal(true);
  };

  const addContentToEdit = () => {
    if (!tempContent.title || !tempContent.content) return;
    
    setEditContent({
      contents: [...editContent.contents, { ...tempContent }]
    });
    setTempContent({
      type: 'text',
      title: '',
      description: '',
      content: ''
    });
  };

  const removeContentFromEdit = (contentIdx) => {
    const updated = editContent.contents.filter((_, idx) => idx !== contentIdx);
    setEditContent({
      contents: updated.length > 0 ? updated : []
    });
  };

  const handleSaveEdit = () => {
    const key = `${selectedModule}-${selectedLesson}`;
    setLessonContents({
      ...lessonContents,
      [key]: editContent.contents
    });
    setShowEditModal(false);
    setEditContent({ contents: [] });
    setTempContent({
      type: 'text',
      title: '',
      description: '',
      content: ''
    });
  };

  const handleDeleteContent = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todo el contenido de esta lección?')) {
      const key = `${selectedModule}-${selectedLesson}`;
      const updatedContents = { ...lessonContents };
      delete updatedContents[key];
      setLessonContents(updatedContents);
    }
  };

  const handleDeleteModule = (moduleIdx) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este módulo completo?')) {
      const updatedModules = courseModules.filter((_, idx) => idx !== moduleIdx);
      setCourseModules(updatedModules);
      if (selectedModule === moduleIdx) {
        setSelectedModule(0);
        setSelectedLesson(0);
      }
    }
  };

  const getDefaultLessonContent = (moduleIdx, lessonIdx) => {
    // Check if this is a webinar module
    const currentModule = courseModules[moduleIdx];
    if (currentModule && (currentModule.title.includes('🎥') || currentModule.title.includes('Webinar'))) {
      return getDefaultWebinarContent(currentModule.title, currentModule.topics[lessonIdx]);
    }

    const defaultContents = [
      // Content set 1: Video + Text
      [
        {
          type: 'video',
          title: 'Video Introductorio',
          content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          description: 'Bienvenida e introducción al tema. Este video te dará una visión general de los conceptos que vamos a cubrir.'
        },
        {
          type: 'text',
          title: 'Fundamentos Teóricos',
          content: `
            <h3>Introducción</h3>
            <p>En esta sección exploraremos los conceptos clave relacionados con ${courseModules[moduleIdx]?.topics[lessonIdx]}.</p>
            
            <h3>Conceptos Principales</h3>
            <p>Los puntos más importantes a recordar son:</p>
            <ul>
              <li><strong>Concepto 1:</strong> Fundamentos básicos y aplicación práctica en el entorno profesional</li>
              <li><strong>Concepto 2:</strong> Mejores prácticas reconocidas en la industria internacional</li>
              <li><strong>Concepto 3:</strong> Casos de uso reales y ejemplos del día a día</li>
              <li><strong>Concepto 4:</strong> Herramientas y recursos disponibles para implementación</li>
            </ul>
            
            <h3>Aplicación Práctica</h3>
            <p>Para aplicar estos conceptos en tu trabajo diario, considera los siguientes pasos:</p>
            <ol>
              <li>Analiza tu situación actual y define objetivos claros</li>
              <li>Implementa gradualmente los conceptos aprendidos</li>
              <li>Documenta tus resultados y ajusta según sea necesario</li>
              <li>Comparte tus experiencias con el equipo</li>
            </ol>
            
            <h3>Recursos Adicionales</h3>
            <p>Te recomendamos revisar el material complementario y participar activamente en las discusiones del curso para maximizar tu aprendizaje.</p>
          `,
          description: 'Material de lectura completo sobre el tema con ejemplos prácticos.'
        }
      ],
      // Content set 2: Text + Video + PDF
      [
        {
          type: 'text',
          title: 'Preparación y Conceptos Previos',
          content: `
            <h3>Antes de Comenzar</h3>
            <p>Es importante que tengas claros algunos conceptos fundamentales antes de avanzar en ${courseModules[moduleIdx]?.topics[lessonIdx]}.</p>
            
            <h3>Requisitos Previos</h3>
            <ul>
              <li>Conocimiento básico del área de estudio</li>
              <li>Motivación para aprender y aplicar nuevos conceptos</li>
              <li>Tiempo dedicado a la práctica y reflexión</li>
            </ul>
          `,
          description: 'Preparación necesaria antes de comenzar la lección.'
        },
        {
          type: 'video',
          title: 'Explicación Detallada con Ejemplos',
          content: 'https://www.youtube.com/embed/jNQXAC9IVRw',
          description: 'Video tutorial completo donde explicamos paso a paso todos los conceptos con ejemplos reales del mundo profesional.'
        },
        {
          type: 'pdf',
          title: 'Guía de Referencia Rápida',
          content: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          description: 'Documento PDF descargable con resumen de conceptos clave, tablas de referencia y ejercicios prácticos para reforzar lo aprendido.'
        }
      ],
      // Content set 3: Video + Text + Video
      [
        {
          type: 'video',
          title: 'Introducción Visual al Tema',
          content: 'https://www.youtube.com/embed/3JZ_D3ELwOQ',
          description: 'Video animado que presenta los conceptos principales de manera visual y fácil de entender.'
        },
        {
          type: 'text',
          title: 'Desglose de Conceptos',
          content: `
            <h3>Análisis Detallado</h3>
            <p>Profundicemos en los elementos clave de ${courseModules[moduleIdx]?.topics[lessonIdx]}:</p>
            
            <h4>1. Primer Componente</h4>
            <p>Este componente es fundamental porque establece las bases para todo el proceso. Debes prestar especial atención a:</p>
            <ul>
              <li>Definición clara de objetivos</li>
              <li>Identificación de recursos necesarios</li>
              <li>Planificación de etapas</li>
            </ul>
            
            <h4>2. Segundo Componente</h4>
            <p>Aquí es donde aplicamos lo aprendido en situaciones reales. Las claves del éxito incluyen:</p>
            <ul>
              <li>Práctica constante y deliberada</li>
              <li>Feedback continuo y ajustes</li>
              <li>Documentación de resultados</li>
            </ul>
            
            <blockquote style="border-left: 4px solid #8b5cf6; padding-left: 16px; color: #6b7280; font-style: italic; margin: 20px 0;">
              "La excelencia no es un acto, sino un hábito. Aplica estos conceptos consistentemente y verás resultados extraordinarios."
            </blockquote>
          `,
          description: 'Texto explicativo con análisis profundo de cada componente.'
        },
        {
          type: 'video',
          title: 'Caso Práctico y Demostración',
          content: 'https://www.youtube.com/embed/YE7VzlLtp-4',
          description: 'Demostración práctica donde aplicamos todos los conceptos en un caso real del mundo profesional.'
        }
      ]
    ];
    
    // Rotate through different content sets
    return defaultContents[lessonIdx % defaultContents.length];
  };

  const getLessonContents = (moduleIdx, lessonIdx) => {
    const key = `${moduleIdx}-${lessonIdx}`;
    if (lessonContents[key]) {
      return Array.isArray(lessonContents[key]) ? lessonContents[key] : [lessonContents[key]];
    }
    return getDefaultLessonContent(moduleIdx, lessonIdx);
  };

  const currentLessonContents = getLessonContents(selectedModule, selectedLesson);

  return (
    <div className="course-learning-container">
      {/* Create Module/Webinar Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {creationType === 'module' ? 'Crear Nuevo Módulo' : 'Crear Nuevo Webinar'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingLessonIndex(null);
                }}
                className="modal-close-btn"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tipo de Creación */}
            <div className="creation-type-selector">
              <label className="creation-type-label">
                Tipo de Contenido
              </label>
              <div className="creation-type-buttons">
                <button
                  onClick={() => setCreationType('module')}
                  className={`creation-type-btn ${creationType === 'module' ? 'module' : 'inactive'}`}
                >
                  <BookOpen size={20} />
                  Módulo de Curso
                </button>
                <button
                  onClick={() => setCreationType('webinar')}
                  className={`creation-type-btn ${creationType === 'webinar' ? 'webinar' : 'inactive'}`}
                >
                  <VideoIcon size={20} />
                  Webinar en Vivo
                </button>
              </div>
            </div>

            {creationType === 'module' ? (
              /* FORMULARIO DE MÓDULO */
              <div>
                {/* Module Title */}
                <div className="form-group">
                  <label className="form-label">
                    Título del Módulo
                  </label>
                  <input
                    type="text"
                    value={newModule.title}
                    onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                    placeholder="Ej: Módulo 7: Análisis Avanzado"
                    className="form-input"
                  />
                </div>

                {/* Lessons */}
                <div className="form-group">
                  <label className="form-label" style={{fontSize: '16px'}}>
                    Lecciones del Módulo
                  </label>
                  
                  {newModule.lessons.map((lesson, lessonIdx) => (
                    <div key={lessonIdx} className="lesson-editor">
                      <div className="lesson-editor-header">
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => updateLessonTitle(lessonIdx, e.target.value)}
                          placeholder={`Nombre de la lección ${lessonIdx + 1}`}
                          className="form-input"
                          style={{fontWeight: '600'}}
                        />
                        <button
                          onClick={() => openLessonContentEditor(lessonIdx)}
                          className="btn btn-primary btn-sm"
                        >
                          + Contenido
                        </button>
                        {newModule.lessons.length > 1 && (
                          <button
                            onClick={() => removeLesson(lessonIdx)}
                            className="btn btn-danger btn-sm"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>

                      {/* Content Editor for Current Lesson */}
                      {editingLessonIndex === lessonIdx && (
                        <div className="content-editor">
                          <h4 className="content-editor-title">
                            Agregar Contenido a esta Lección
                          </h4>
                          
                          <div className="form-grid" style={{gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px'}}>
                            <div>
                              <label className="form-label" style={{fontSize: '13px'}}>
                                Tipo
                              </label>
                              <select
                                value={currentLessonContent.type}
                                onChange={(e) => setCurrentLessonContent({ ...currentLessonContent, type: e.target.value })}
                                className="form-input"
                                style={{fontSize: '13px', padding: '8px'}}
                              >
                                <option value="text">📝 Texto</option>
                                <option value="video">🎥 Video</option>
                                <option value="pdf">📄 PDF</option>
                              </select>
                            </div>
                            <div>
                              <label className="form-label" style={{fontSize: '13px'}}>
                                Título
                              </label>
                              <input
                                type="text"
                                value={currentLessonContent.title}
                                onChange={(e) => setCurrentLessonContent({ ...currentLessonContent, title: e.target.value })}
                                placeholder="Título del contenido"
                                className="form-input"
                                style={{fontSize: '13px', padding: '8px'}}
                              />
                            </div>
                          </div>

                          <div className="form-group" style={{marginBottom: '12px'}}>
                            <label className="form-label" style={{fontSize: '13px'}}>
                              Descripción
                            </label>
                            <input
                              type="text"
                              value={currentLessonContent.description}
                              onChange={(e) => setCurrentLessonContent({ ...currentLessonContent, description: e.target.value })}
                              placeholder="Descripción breve"
                              className="form-input"
                              style={{fontSize: '13px', padding: '8px'}}
                            />
                          </div>

                          <div className="form-group" style={{marginBottom: '12px'}}>
                            <label className="form-label" style={{fontSize: '13px'}}>
                              {currentLessonContent.type === 'video' && 'URL del Video'}
                              {currentLessonContent.type === 'pdf' && 'URL del PDF'}
                              {currentLessonContent.type === 'text' && 'Contenido HTML'}
                            </label>
                            {currentLessonContent.type === 'text' ? (
                              <textarea
                                value={currentLessonContent.content}
                                onChange={(e) => setCurrentLessonContent({ ...currentLessonContent, content: e.target.value })}
                                placeholder="<h3>Título</h3><p>Contenido...</p>"
                                rows={4}
                                className="form-textarea"
                                style={{fontSize: '13px', fontFamily: 'monospace', padding: '8px'}}
                              />
                            ) : (
                              <input
                                type="text"
                                value={currentLessonContent.content}
                                onChange={(e) => setCurrentLessonContent({ ...currentLessonContent, content: e.target.value })}
                                placeholder={currentLessonContent.type === 'video' ? 
                                  'https://www.youtube.com/embed/VIDEO_ID' : 
                                  'https://example.com/file.pdf'
                                }
                                className="form-input"
                                style={{fontSize: '13px', padding: '8px'}}
                              />
                            )}
                          </div>

                          <button
                            onClick={addContentToLesson}
                            className="btn btn-success btn-sm"
                          >
                            <Plus size={16} />
                            Agregar este Contenido
                          </button>
                        </div>
                      )}

                      {/* Display added contents */}
                      {lesson.contents.length > 0 && (
                        <div className="content-list">
                          <p style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                            Contenidos agregados ({lesson.contents.length}):
                          </p>
                          {lesson.contents.map((content, contentIdx) => (
                            <div key={contentIdx} className="content-item">
                              <div className="content-item-info">
                                {content.type === 'video' && <Video size={16} color="#8b5cf6" />}
                                {content.type === 'text' && <FileText size={16} color="#8b5cf6" />}
                                {content.type === 'pdf' && <FileText size={16} color="#8b5cf6" />}
                                <span className="content-item-title">{content.title}</span>
                              </div>
                              <button
                                onClick={() => removeContentFromLesson(lessonIdx, contentIdx)}
                                className="btn btn-danger btn-sm"
                                style={{background: 'none', color: '#ef4444', padding: '4px'}}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={addLessonToNewModule}
                    className="webinar-example-btn"
                    style={{background: '#f3f4f6', borderColor: '#d1d5db', color: '#6b7280'}}
                  >
                    <Plus size={16} />
                    Agregar Otra Lección
                  </button>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px', paddingTop: '24px', borderTop: '2px solid #e5e7eb' }}>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingLessonIndex(null);
                    }}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateModule}
                    className="btn btn-primary"
                  >
                    Crear Módulo Completo
                  </button>
                </div>
              </div>
            ) : (
              /* FORMULARIO DE WEBINAR */
              <div>
                {/* Título del Webinar */}
                <div className="form-group">
                  <label className="form-label">
                    Título del Webinar *
                  </label>
                  <input
                    type="text"
                    value={newWebinar.title}
                    onChange={(e) => setNewWebinar({ ...newWebinar, title: e.target.value })}
                    placeholder="Ej: Webinar: Introducción a React Hooks"
                    className="form-input"
                  />
                </div>

                {/* Descripción */}
                <div className="form-group">
                  <label className="form-label">
                    Descripción
                  </label>
                  <textarea
                    value={newWebinar.description}
                    onChange={(e) => setNewWebinar({ ...newWebinar, description: e.target.value })}
                    placeholder="Describe el contenido y objetivos del webinar..."
                    rows={3}
                    className="form-textarea"
                  />
                </div>

                {/* Fecha y Hora */}
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={newWebinar.date}
                      onChange={(e) => setNewWebinar({ ...newWebinar, date: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Hora
                    </label>
                    <input
                      type="time"
                      value={newWebinar.time}
                      onChange={(e) => setNewWebinar({ ...newWebinar, time: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Enlace de YouTube */}
                <div className="form-group">
                  <label className="form-label">
                    Enlace de YouTube (Opcional)
                  </label>
                  <input
                    type="url"
                    value={newWebinar.youtubeLink}
                    onChange={(e) => setNewWebinar({ ...newWebinar, youtubeLink: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="form-input"
                  />
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                    Enlace del video en vivo de YouTube
                  </p>
                </div>

                {/* Enlaces de Reunión */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label className="form-label" style={{margin: 0}}>
                      Enlaces de Reunión (Zoom, Meet, etc.)
                    </label>
                    <button
                      onClick={addMeetingLink}
                      className="btn btn-secondary btn-sm"
                    >
                      <Plus size={14} />
                      Agregar Enlace
                    </button>
                  </div>

                  {newWebinar.meetingLinks.map((link, index) => (
                    <div key={index} className="meeting-link-container">
                      <div className="meeting-link-header">
                        <div style={{ flex: 1 }}>
                          <label className="form-label" style={{fontSize: '13px'}}>
                            Plataforma
                          </label>
                          <select
                            value={link.platform}
                            onChange={(e) => updateMeetingLink(index, 'platform', e.target.value)}
                            className="form-input"
                            style={{fontSize: '13px', padding: '10px'}}
                          >
                            <option value="Zoom">Zoom</option>
                            <option value="Google Meet">Google Meet</option>
                            <option value="Microsoft Teams">Microsoft Teams</option>
                            <option value="Webex">Webex</option>
                            <option value="Otro">Otro</option>
                          </select>
                        </div>
                        {newWebinar.meetingLinks.length > 1 && (
                          <button
                            onClick={() => removeMeetingLink(index)}
                            className="btn btn-danger btn-sm"
                            style={{alignSelf: 'flex-end', height: 'fit-content'}}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="form-group" style={{marginBottom: '12px'}}>
                        <label className="form-label" style={{fontSize: '13px'}}>
                          Enlace de la Reunión
                        </label>
                        <input
                          type="url"
                          value={link.link}
                          onChange={(e) => updateMeetingLink(index, 'link', e.target.value)}
                          placeholder={`https://${link.platform.toLowerCase()}.com/j/...`}
                          className="form-input"
                          style={{fontSize: '13px', padding: '10px'}}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{fontSize: '13px'}}>
                          Contraseña (Opcional)
                        </label>
                        <input
                          type="text"
                          value={link.password}
                          onChange={(e) => updateMeetingLink(index, 'password', e.target.value)}
                          placeholder="Contraseña de acceso"
                          className="form-input"
                          style={{fontSize: '13px', padding: '10px'}}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botón de Ejemplo */}
                <div className="form-group">
                  <button
                    onClick={loadDefaultWebinarExample}
                    className="webinar-example-btn"
                  >
                    <VideoIcon size={18} />
                    Cargar Ejemplo de Webinar
                  </button>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px', paddingTop: '24px', borderTop: '2px solid #e5e7eb' }}>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingLessonIndex(null);
                    }}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateWebinar}
                    className="btn btn-warning"
                  >
                    Crear Webinar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Content Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Editar Contenidos de la Lección</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="modal-close-btn"
              >
                <X size={24} />
              </button>
            </div>

            {/* Current Contents */}
            {editContent.contents.length > 0 && (
              <div className="form-group">
                <h3 className="form-label">
                  Contenidos Actuales
                </h3>
                {editContent.contents.map((content, idx) => (
                  <div key={idx} className="content-item">
                    <div className="content-item-info">
                      {content.type === 'video' && <Video size={20} color="#8b5cf6" />}
                      {content.type === 'text' && <FileText size={20} color="#8b5cf6" />}
                      {content.type === 'pdf' && <FileText size={20} color="#8b5cf6" />}
                      <div>
                        <p style={{ fontWeight: '600', margin: 0, fontSize: '14px' }}>{content.title}</p>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>{content.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeContentFromEdit(idx)}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Content */}
            <div className="content-editor" style={{background: '#f0fdf4', borderColor: '#10b981'}}>
              <h3 className="content-editor-title" style={{color: '#10b981'}}>
                Agregar Nuevo Contenido
              </h3>
              
              <div className="form-grid" style={{marginBottom: '12px'}}>
                <div className="form-group">
                  <label className="form-label" style={{fontSize: '13px'}}>
                    Tipo
                  </label>
                  <select
                    value={tempContent.type}
                    onChange={(e) => setTempContent({ ...tempContent, type: e.target.value })}
                    className="form-input"
                    style={{fontSize: '14px', padding: '10px'}}
                  >
                    <option value="text">📝 Texto</option>
                    <option value="video">🎥 Video</option>
                    <option value="pdf">📄 PDF</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{fontSize: '13px'}}>
                    Título
                  </label>
                  <input
                    type="text"
                    value={tempContent.title}
                    onChange={(e) => setTempContent({ ...tempContent, title: e.target.value })}
                    placeholder="Título del contenido"
                    className="form-input"
                    style={{fontSize: '14px', padding: '10px'}}
                  />
                </div>
              </div>

              <div className="form-group" style={{marginBottom: '12px'}}>
                <label className="form-label" style={{fontSize: '13px'}}>
                  Descripción
                </label>
                <input
                  type="text"
                  value={tempContent.description}
                  onChange={(e) => setTempContent({ ...tempContent, description: e.target.value })}
                  placeholder="Descripción breve"
                  className="form-input"
                  style={{fontSize: '14px', padding: '10px'}}
                />
              </div>

              <div className="form-group" style={{marginBottom: '12px'}}>
                <label className="form-label" style={{fontSize: '13px'}}>
                  {tempContent.type === 'video' && 'URL del Video'}
                  {tempContent.type === 'pdf' && 'URL del PDF'}
                  {tempContent.type === 'text' && 'Contenido HTML'}
                </label>
                {tempContent.type === 'text' ? (
                  <textarea
                    value={tempContent.content}
                    onChange={(e) => setTempContent({ ...tempContent, content: e.target.value })}
                    placeholder="<h3>Título</h3><p>Contenido...</p>"
                    rows={5}
                    className="form-textarea"
                    style={{fontSize: '14px', fontFamily: 'monospace', padding: '10px'}}
                  />
                ) : (
                  <input
                    type="text"
                    value={tempContent.content}
                    onChange={(e) => setTempContent({ ...tempContent, content: e.target.value })}
                    placeholder={tempContent.type === 'video' ? 
                      'https://www.youtube.com/embed/VIDEO_ID' : 
                      'https://example.com/file.pdf'
                    }
                    className="form-input"
                    style={{fontSize: '14px', padding: '10px'}}
                  />
                )}
              </div>

              <button
                onClick={addContentToEdit}
                className="btn btn-success"
              >
                <Plus size={18} />
                Agregar Contenido
              </button>
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowEditModal(false)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="btn btn-success"
              >
                <Save size={18} />
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Menu */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h2 className="sidebar-title">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="sidebar-close-btn"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Profile */}
          <div className="user-profile">
            <div className="user-info-container">
              <div className="user-avatar">
                {user?.name?.[0] || 'U'}
              </div>
              <div className="user-info">
                <p className="user-name">
                  {user?.name || 'Usuario'}
                </p>
                <p className="user-email">
                  {user?.email || 'user@email.com'}
                </p>
              </div>
            </div>
            {isAdmin && (
              <div className="admin-badge">
                👑 Administrador
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav>
            <button
              onClick={onBackToHome}
              className="nav-btn"
            >
              <Home size={20} />
              Inicio
            </button>
          </nav>

          {/* My Courses */}
          <div className="course-list">
            <h3 className="course-list-title">
              Mis Cursos
            </h3>
            {enrolledCourses.map((enrolledCourse, idx) => (
              <div
                key={idx}
                onClick={() => onGoToCourse(enrolledCourse)}
                className={`course-item ${enrolledCourse.id === course.id ? 'active' : ''}`}
              >
                <div className="course-item-content">
                  <BookOpen size={20} style={{ color: 'white', flexShrink: 0 }} />
                  <div>
                    <p className="course-item-title">
                      {enrolledCourse.title}
                    </p>
                    <p className="course-item-status">
                      En progreso
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="overlay"
        />
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-left">
            <button
              onClick={() => setSidebarOpen(true)}
              className="menu-btn"
            >
              <Menu size={20} />
            </button>
            <div className="course-info">
              <h1>{course.title}</h1>
              <p>{course.subtitle}</p>
            </div>
          </div>
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${calculateProgress()}%`}}
              />
            </div>
            <span className="progress-text">
              {calculateProgress()}%
            </span>
          </div>
        </div>

        <div className="content-layout">
          {/* Course Modules Sidebar */}
          <div className="modules-sidebar">
            <div className="modules-header">
              <h2 className="modules-title">
                Contenido del Curso
              </h2>
              {isAdmin && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn btn-success btn-sm"
                >
                  <Plus size={16} />
                  Nuevo
                </button>
              )}
            </div>
            
            {courseModules.map((module, moduleIdx) => (
              <div key={moduleIdx} className="module-item">
                <div className="module-header">
                  <button
                    onClick={() => toggleModule(moduleIdx)}
                    className="module-btn"
                  >
                    <span>{module.title}</span>
                    {expandedModules.includes(moduleIdx) ? 
                      <ChevronDown size={16} /> : 
                      <ChevronRight size={16} />
                    }
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteModule(moduleIdx)}
                      className="btn btn-danger btn-sm"
                      title="Eliminar módulo"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                {expandedModules.includes(moduleIdx) && (
                  <div className="lesson-list">
                    {module.topics.map((topic, topicIdx) => (
                      <button
                        key={topicIdx}
                        onClick={() => {
                          setSelectedModule(moduleIdx);
                          setSelectedLesson(topicIdx);
                        }}
                        className={`lesson-btn ${selectedModule === moduleIdx && selectedLesson === topicIdx ? 'active' : ''}`}
                      >
                        <div className={`lesson-checkbox ${isLessonCompleted(moduleIdx, topicIdx) ? 'completed' : ''}`}>
                          {isLessonCompleted(moduleIdx, topicIdx) && (
                            <Check size={12} className="lesson-checkbox-icon" />
                          )}
                        </div>
                        <span>{topic}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lesson Content */}
          <div className="content-area">
            <div className="lesson-content-container">
              <div className="lesson-content-header">
                <h2 className="lesson-title">
                  {courseModules[selectedModule]?.topics[selectedLesson]}
                </h2>
                {isAdmin && (
                  <div className="lesson-actions">
                    <button
                      onClick={handleOpenEditModal}
                      className="btn btn-primary btn-sm"
                    >
                      <Edit2 size={16} />
                      Editar
                    </button>
                    <button
                      onClick={handleDeleteContent}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                )}
              </div>

              {/* Display All Contents */}
              {currentLessonContents.map((content, idx) => (
                <div key={idx} className="content-section">
                  <div className="content-header">
                    <div className="content-title">
                      {content.type === 'video' && <Video size={20} color="#8b5cf6" />}
                      {content.type === 'text' && <FileText size={20} color="#8b5cf6" />}
                      {content.type === 'pdf' && <FileText size={20} color="#8b5cf6" />}
                      <p>{content.title}</p>
                    </div>
                    {content.description && (
                      <p className="content-description">
                        {content.description}
                      </p>
                    )}
                  </div>

                  {/* Content Display */}
                  {content.type === 'video' && (
                    <div className="video-container">
                      <iframe
                        className="video-iframe"
                        src={content.content}
                        title={content.title}
                        allowFullScreen
                      />
                    </div>
                  )}

                  {content.type === 'text' && (
                    <div
                      className="text-content"
                      dangerouslySetInnerHTML={{ __html: content.content }}
                    />
                  )}

                  {content.type === 'pdf' && (
                    <div className="pdf-container">
                      <FileText size={48} color="#8b5cf6" className="pdf-icon" />
                      <h3 className="pdf-title">
                        {content.title}
                      </h3>
                      <p className="pdf-description">
                        {content.description || 'Material descargable'}
                      </p>
                      <a
                        href={content.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdf-download-btn"
                      >
                        Descargar / Ver PDF
                      </a>
                    </div>
                  )}

                  {idx < currentLessonContents.length - 1 && (
                    <div style={{
                      height: '1px',
                      background: '#e5e7eb',
                      margin: '24px 0'
                    }} />
                  )}
                </div>
              ))}

              {/* Mark as Complete */}
              <div className="completion-section">
                <span className="completion-text">
                  ¿Completaste esta lección?
                </span>
                <button
                  onClick={() => toggleLessonComplete(selectedModule, selectedLesson)}
                  className={`completion-btn ${isLessonCompleted(selectedModule, selectedLesson) ? 'completed' : 'pending'}`}
                >
                  <Check size={18} />
                  {isLessonCompleted(selectedModule, selectedLesson) ? 
                    'Completada' : 
                    'Marcar como completada'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseLearning;