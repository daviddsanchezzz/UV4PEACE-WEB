# UV4PEACE · web en Astro

Web de United Voices 4 Peace. Fase 1: sitio público estático, construido a partir del diseño
aprobado en `../WEB CLAUDE DESING/` y de los datos reales del export (`data/*.json`).

## Arrancar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera /dist
npm run check    # astro check (tipos)
```

Necesita Node 18.20 o superior.

## Stack

- Astro 5 + TypeScript, salida `server` con adaptador de Vercel: las páginas públicas llevan
  `export const prerender = true` (estáticas); `/admin` y los endpoints de formularios (Fases 3-4)
  se sirven en servidor.
- Tailwind v4 (el export de Claude Design ya lo usaba). Tokens en `src/styles/global.css`,
  traídos de `WEB CLAUDE DESING/uploads/UV4PEACE-claude-design/sistema-diseno/tokens.css`.
- Tipografía Jost vía `@fontsource/jost`.

## Páginas

| Ruta | Qué es |
|---|---|
| `/` | Home |
| `/projects/` | Todos los proyectos, con filtro Ongoing / Archive |
| `/projects/[slug]/` | Ficha de proyecto (GWIM completa; el resto con los datos reales del archivo, foto pendiente) |
| `/people/` | Fundadora, equipo/board, embajadores y artistas |
| `/get-involved/` | Partner, Propose, Donate, Spread the word |
| `/donate/` | Donación vía PayPal (enlace pendiente) y entidades legales |
| `/press/` | Reconocimientos, medios y contacto de prensa |
| `/privacy/`, `/terms/`, `/cookies/` | Legales (solo datos del responsable; falta el texto legal revisado) |
| `/404` | Página no encontrada |

## Dónde se edita cada cosa

- **Organización, navegación, fundadora:** `src/data/site.ts`
- **Proyectos y ediciones:** `src/data/projects.ts`
- **Personas (equipo, board, artistas):** `src/data/people.ts`
- **Premios y menciones de prensa:** `src/data/press.ts`
- **Partners:** `src/data/partners.ts`
- **Testimonios:** `src/data/testimonials.ts`
- **Cifras de impacto:** `src/data/stats.ts`
- **Fotos:** `src/assets/fotos/`. Astro las convierte a webp en varios tamaños; se referencian
  por nombre de archivo con `<Photo src="..." alt="..." />`. Las fotos de personas que aún viven
  en uv4peace.org se referencian con su URL completa (`https://...`); el componente `Photo`
  soporta ambos casos.
- **Logos y favicon:** `public/logos/` y `public/favicon.svg`

## Sobre los datos que faltan

Siguiendo la regla de no inventar contenido: todo lo que en el export aparecía como
`[PENDIENTE: …]` o `[IMG-xx]` se guardó como campo vacío (`''`, `null` o ausente) y la plantilla
lo omite en vez de mostrar el corchete. Lo más visible:

- Vídeo del hero (`site.heroVideo`), enlace de PayPal (`site.paypalUrl`), proveedor de newsletter
  (`site.newsletterAction`) y URLs de redes sociales (`site.social`).
- Bio corta de la fundadora (`founder.bio`).
- Foto de portada de 19 de los 20 proyectos del archivo (todos menos Global Women in Music).
- Sede de la edición 2025 y fecha/sede de la edición 2027 de GWIM.
- Logos de los partners (se muestran como texto, que es como lo pidió el propio diseño mientras
  no haya archivos autorizados).
- Texto legal revisado de Terms / Privacy / Cookies (de momento solo se muestra el responsable
  de los datos y el contacto).

Para ver estos huecos de un vistazo:

```bash
grep -rn "src: ''" src/data
```

## Pendiente de decisión antes de la Fase 2

El encargo no define una tabla para el texto legal (Terms/Privacy/Cookies). Lo dejo como texto
estático en el código por ahora; dime si quieres que también sea editable desde el panel y le
sumamos una tabla sencilla en Supabase.
