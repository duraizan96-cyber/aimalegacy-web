# IndexNow — Aima Legacy

IndexNow permite notificar a los buscadores (Bing, Yandex, Seznam, Naver) cuando una URL cambia sin esperar a que la recrawleen. Google no participa directamente pero recibe la señal vía Bing.

## Configuración

- **Key UUID v4**: `b9dfc554-d977-45e3-b769-296fd3ea3461`
- **Archivo de verificación**: `/b9dfc554-d977-45e3-b769-296fd3ea3461.txt`
- **URL pública del archivo**: https://aimalegacy.es/b9dfc554-d977-45e3-b769-296fd3ea3461.txt

El archivo contiene únicamente la key (sin saltos de línea adicionales) para que los buscadores puedan verificar la propiedad del dominio.

## Ping manual post-deploy (URL individual)

Tras cada deploy, ejecutar:

```bash
curl "https://api.indexnow.org/indexnow?url=https://aimalegacy.es/&key=b9dfc554-d977-45e3-b769-296fd3ea3461"
```

Respuesta esperada: `200 OK` (éxito) o `202 Accepted` (aceptado, pendiente de validación).

## Ping de múltiples URLs (lote)

Para notificar varias URLs a la vez usa POST con JSON:

```bash
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "aimalegacy.es",
    "key": "b9dfc554-d977-45e3-b769-296fd3ea3461",
    "keyLocation": "https://aimalegacy.es/b9dfc554-d977-45e3-b769-296fd3ea3461.txt",
    "urlList": [
      "https://aimalegacy.es/",
      "https://aimalegacy.es/privacidad",
      "https://aimalegacy.es/terminos",
      "https://aimalegacy.es/cookies"
    ]
  }'
```

## Endpoints alternativos (equivalentes)

- `https://www.bing.com/indexnow` (Bing)
- `https://yandex.com/indexnow` (Yandex)
- `https://search.seznam.cz/indexnow` (Seznam)
- `https://searchadvisor.naver.com/indexnow` (Naver)

Usar `api.indexnow.org` es recomendado porque distribuye la señal automáticamente a todos los motores participantes.

## Códigos de respuesta

- `200` — Ping recibido y procesado
- `202` — Aceptado, pendiente de validación de la key
- `400` — Request malformado
- `403` — Key no coincide con el archivo del dominio
- `422` — URL no pertenece al host declarado
- `429` — Rate limit superado

## Verificación

Comprobar que el archivo de key es accesible públicamente tras el deploy:

```bash
curl -I https://aimalegacy.es/b9dfc554-d977-45e3-b769-296fd3ea3461.txt
```

Debe devolver `200 OK` con `Content-Type: text/plain`.
