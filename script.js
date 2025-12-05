// Obtiene el elemento canvas del DOM por su ID 'matrix'
const canvas = document.getElementById('matrix');

// Obtiene el contexto 2D del canvas para poder dibujar en él
const ctx = canvas.getContext('2d');

// Establece el ancho del canvas igual al ancho de la ventana del navegador
canvas.width = window.innerWidth;

// Establece la altura del canvas igual a la altura de la ventana del navegador
canvas.height = window.innerHeight;

// Cadena de caracteres que se usarán en el efecto Matrix (binarios y katakana japonés)
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

// Tamaño de fuente para los caracteres
const fontSize = 14;

// Calcula cuántas columnas caben en el canvas (ancho total / tamaño de fuente)
const columns = canvas.width / fontSize;

// Crea un array con tantos elementos como columnas, inicializados en 1
// Representa la posición Y de cada columna de caracteres
const drops = Array(Math.floor(columns)).fill(1);

// Función principal que dibuja el efecto Matrix
function drawMatrix() {
    // Dibuja un rectángulo semitransparente negro para crear el efecto de rastro/fade
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
    
    // Rellena todo el canvas con el color anterior
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Establece el color de los caracteres (verde neón tipo Matrix)
    ctx.fillStyle = '#00ff41';
    
    // Establece la fuente y tamaño para los caracteres
    ctx.font = fontSize + 'px monospace';

    // Itera a través de todas las columnas
    for (let i = 0; i < drops.length; i++) {
        // Selecciona un carácter aleatorio de la cadena 'chars'
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Dibuja el carácter en la posición correspondiente (columna i, fila drops[i])
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Si el carácter ha llegado al fondo del canvas Y un número aleatorio es > 0.975 (2.5% de probabilidad)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            // Reinicia esta columna al principio
            drops[i] = 0;
        }
        // Incrementa la posición Y de esta columna para que baje en el siguiente frame
        drops[i]++;
    }
}

// Ejecuta la función drawMatrix cada 50 milisegundos (20 veces por segundo)
setInterval(drawMatrix, 50);

// Event listener para redimensionar el canvas cuando cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    // Ajusta el ancho del canvas al nuevo ancho de ventana
    canvas.width = window.innerWidth;
    
    // Ajusta la altura del canvas a la nueva altura de ventana
    canvas.height = window.innerHeight;
});

// EFECTO DE GLITCH EN EL TÍTULO

// Selecciona el elemento con clase 'glitch' (probablemente el título)
const glitchText = document.querySelector('.glitch');

// Guarda el texto original del elemento
const originalText = glitchText.textContent;

// Efecto de parpadeo/glitch aleatorio
setInterval(() => {
    // Con un 5% de probabilidad (Math.random() > 0.95)
    if (Math.random() > 0.95) {
        // Aplica una sombra de texto roja y cian (efecto glitch)
        glitchText.style.textShadow = '-2px 0 10px #ff0000, 2px 0 10px #00ffff';
        
        // Después de 50ms, vuelve a la sombra verde normal
        setTimeout(() => {
            glitchText.style.textShadow = '0 0 10px #00ff41, 0 0 20px #00ff41';
        }, 50);
    }
}, 200); // Se ejecuta cada 200ms

// ANIMACIÓN DE SCROLL

// Crea un IntersectionObserver para detectar cuándo elementos son visibles en pantalla
const observer = new IntersectionObserver((entries) => {
    // Para cada elemento observado
    entries.forEach(entry => {
        // Si el elemento está intersectando (visible en pantalla)
        if (entry.isIntersecting) {
            // Hace el elemento completamente opaco
            entry.target.style.opacity = '1';
            
            // Mueve el elemento a su posición original (sin transformación)
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.1 }); // Se activa cuando al menos el 10% del elemento es visible

// Selecciona todos los elementos con clase 'section'
document.querySelectorAll('.section').forEach(section => {
    // Comienza a observar cada sección
    observer.observe(section);
});

// EFECTO HOVER EN BOTONES

// Selecciona todos los botones con clase 'action-btn'
document.querySelectorAll('.action-btn').forEach(btn => {
    // Cuando el mouse entra en el botón
    btn.addEventListener('mouseenter', function() {
        // Aplica una sombra verde brillante (efecto de resplandor)
        this.style.boxShadow = '0 0 30px rgba(0, 255, 65, 1)';
    });
    
    // Cuando el mouse sale del botón
    btn.addEventListener('mouseleave', function() {
        // Vuelve a la sombra verde tenue original
        this.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.3)';
    });
});
