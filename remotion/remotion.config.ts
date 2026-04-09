/**
 * remotion.config.ts — Configuración global de Remotion
 * Documentación: https://www.remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

// Codec de salida por defecto
Config.setVideoImageType("jpeg");
Config.setJpegQuality(95);

// Codec H.264 para máxima compatibilidad con plataformas sociales
Config.setCodec("h264");

// Nivel de concurrencia al renderizar (ajustar según CPU disponible)
Config.setConcurrency(4);

// Pixel format compatible con Instagram / TikTok / LinkedIn
Config.setPixelFormat("yuv420p");

// Punto de entrada
Config.setEntryPoint("./src/Root.tsx");

// Directorio de salida
Config.setOutputLocation("./out");

// Log level
Config.setLogLevel("info");
