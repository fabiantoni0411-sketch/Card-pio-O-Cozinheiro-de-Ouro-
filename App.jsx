import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  ShoppingCart, Plus, Minus, Trash2, ChevronLeft, MapPin, Phone, User,
  Clock, CheckCircle2, Circle, Truck, ChefHat, Package, Search,
  Settings, LogOut, Eye, EyeOff, Pencil, X, Star, Power, PowerOff,
  BarChart3, ListOrdered, Landmark, Copy, Check, Store, Image as ImageIcon,
  Upload, MessageCircle, Gift, Tag
} from "lucide-react";

// ---------- Brand tokens ----------
const C = {
  red: "#C1272D",
  redDeep: "#8E1D22",
  gold: "#D4A017",
  goldLight: "#F2C94C",
  cream: "#FFF8EC",
  ink: "#1A1A1A",
  gray: "#6B6B6B",
  line: "#E8E2D6",
  green: "#25D366",
};

const LOGO_B64 = "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";
const DEFAULT_IMAGE = "data:image/jpeg;base64," + LOGO_B64;

// Categorias exibidas em ordem (achatadas, sem agrupamento "Salgados/Doces")
const FLAT_CATEGORIES = [
  "Avisos",
  "Promoções",
  "Lançamentos",
  "Lanches Tradicionais",
  "Duplo",
  "Artesanais",
  "Smash Burgers",
  "Carne Louca",
  "Porções",
  "Combos do Chef",
  "Barcas",
  "Açaí",
  "Cupuaçu",
  "Creme de Morango",
  "Vitamina de Açaí",
  "Complementos",
  "Bebidas",
];

// mantido apenas para o formulário de produto (agrupar opções de subcategoria)
const SUBCATS = {
  Salgados: ["Avisos", "Promoções", "Lanches Tradicionais", "Duplo", "Artesanais", "Smash Burgers", "Carne Louca", "Porções", "Combos do Chef", "Barcas"],
  Doces: ["Açaí", "Cupuaçu", "Creme de Morango", "Vitamina de Açaí", "Complementos"],
  Bebidas: ["Bebidas"],
};

function normalizePhone(p) {
  return (p || "").replace(/\D/g, "");
}

// redimensiona/comprime uma imagem para base64 antes de guardar
function resizeImageFile(file, maxDim = 500, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target.result;
      try {
        const img = new window.Image();
        img.onload = () => {
          try {
            let { width, height } = img;
            const scale = Math.min(1, maxDim / Math.max(width, height));
            width = Math.round(width * scale);
            height = Math.round(height * scale);
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", quality));
          } catch (err) {
            // se o canvas falhar por algum motivo, usa a imagem original sem redimensionar
            resolve(rawDataUrl);
          }
        };
        img.onerror = () => resolve(rawDataUrl);
        img.src = rawDataUrl;
      } catch (err) {
        resolve(rawDataUrl);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function uid(prefix) {
  return prefix + "_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// ---------- Seed data ----------
function seedProducts() {
  const mk = (name, subcategory, group, price, opts = {}) => ({
    id: uid("p"),
    name,
    subcategory,
    group,
    price,
    description: opts.description || "",
    ingredients: opts.ingredients || "",
    active: true,
    featured: !!opts.featured,
    image: opts.image || DEFAULT_IMAGE,
    sold: 0,
    soldMonth: currentMonthKey(),
  });

  return [
    // Lanches Tradicionais
    mk("X Salada", "Lanches Tradicionais", "Salgados", 12.99, { description: "Pão com gergelim, hambúrguer artesanal de 75g, queijo cheddar, alface, tomate, cebola e molho da casa." }),
    mk("X Bacon", "Lanches Tradicionais", "Salgados", 14.99, { description: "Pão com gergelim, hambúrguer artesanal de 75g, bacon crocante, queijo cheddar, alface, tomate e molho da casa." }),
    mk("X Calabresa", "Lanches Tradicionais", "Salgados", 14.99, { description: "Pão com gergelim, hambúrguer artesanal de 75g, calabresa grelhada, queijo cheddar, alface, tomate e molho da casa." }),
    mk("X Egg", "Lanches Tradicionais", "Salgados", 14.99, { description: "Pão com gergelim, hambúrguer artesanal de 75g, ovo na chapa, queijo cheddar, alface, tomate e molho da casa." }),
    mk("X Onion", "Lanches Tradicionais", "Salgados", 16.99, { description: "Pão com gergelim, hambúrguer artesanal de 75g, queijo cheddar, cebola, alface, tomate e molho da casa." }),
    mk("Duplo Burguer", "Lanches Tradicionais", "Salgados", 16.99, { description: "Pão com gergelim, dois hambúrgueres artesanais de 75g, queijo cheddar, alface, tomate e molho da casa." }),
    mk("Duplo Bacon", "Lanches Tradicionais", "Salgados", 18.99, { description: "Pão com gergelim, dois hambúrgueres artesanais de 75g, bacon crocante, queijo cheddar, alface, tomate e molho da casa." }),
    mk("X Tudo", "Lanches Tradicionais", "Salgados", 21.99, { description: "Pão com gergelim, hambúrguer artesanal de 75g, bacon, calabresa, ovo, queijo cheddar, alface, tomate e molho da casa." }),
    // Duplo (56g)
    mk("Duplo Burguer", "Duplo", "Salgados", 16.99, { description: "Pão com gergelim 56g, 2 hambúrgueres de carne 56g, 2 queijos muçarela, cheddar, catupiry, ketchup, maionese e molho da casa." }),
    mk("Duplo Salada", "Duplo", "Salgados", 17.99, { description: "Pão com gergelim 56g, 2 hambúrgueres de carne 56g, 2 queijos muçarela, alface, tomate, cheddar, catupiry, ketchup, maionese e molho da casa." }),
    mk("Duplo Bacon", "Duplo", "Salgados", 18.99, { description: "Pão com gergelim 56g, 2 hambúrgueres de carne 56g, bacon em dobro, queijo muçarela, alface, tomate, cheddar, catupiry, ketchup, maionese e molho da casa." }),
    mk("Duplo Calabresa", "Duplo", "Salgados", 18.99, { description: "Pão com gergelim 56g, 2 hambúrgueres de carne 56g, calabresa em dobro, queijo muçarela, alface, tomate, cheddar, catupiry, ketchup, maionese e molho da casa." }),
    mk("Duplo Egg", "Duplo", "Salgados", 18.99, { description: "Pão com gergelim 56g, 2 hambúrgueres de carne 56g, 2 ovos, queijo muçarela, alface, tomate, cheddar, catupiry, ketchup, maionese e molho da casa." }),
    mk("Duplo Salame", "Duplo", "Salgados", 21.99, { description: "Pão com gergelim 56g, 2 hambúrgueres de carne 56g, salame em dobro, queijo muçarela, alface, tomate, cheddar, catupiry, ketchup, maionese e molho da casa." }),
    mk("Duplo Frango", "Duplo", "Salgados", 21.99, { description: "Pão com gergelim 56g, 2 hambúrgueres de carne 56g, frango desfiado em dobro, queijo muçarela, alface, tomate, cheddar, catupiry, ketchup, maionese e molho da casa." }),
    mk("Duplo Tudo", "Duplo", "Salgados", 29.99, { description: "Pão com gergelim 56g, 2 hambúrgueres de carne 56g, calabresa em dobro, bacon em dobro, 2 ovos, queijo muçarela, alface, tomate, cheddar, catupiry, ketchup, maionese e molho da casa." }),
    // Artesanais
    mk("Artesanal Bacon", "Artesanais", "Salgados", 27.99, { description: "Pão com gergelim, hambúrguer artesanal de 150g, bacon crocante, cheddar, alface, tomate e molho especial." }),
    mk("Artesanal Calabresa", "Artesanais", "Salgados", 27.99, { description: "Pão com gergelim, hambúrguer artesanal de 150g, calabresa, cheddar, alface, tomate e molho especial." }),
    mk("Artesanal Egg", "Artesanais", "Salgados", 27.99, { description: "Pão com gergelim, hambúrguer artesanal de 150g, ovo na chapa, cheddar, alface, tomate e molho especial." }),
    mk("X Australiano Onion", "Artesanais", "Salgados", 31.99, { description: "Pão de brioche, hambúrguer artesanal de 150g, bacon crocante, onion rings, queijo cheddar, alface, tomate e molho especial." }),
    mk("Artesanal Tudo", "Artesanais", "Salgados", 37.99, { description: "Pão com gergelim, hambúrguer artesanal de 150g, bacon, calabresa, ovo, cheddar, alface, tomate e molho especial." }),
    // Smash
    mk("Smash Solo", "Smash Burgers", "Salgados", 18.99, { description: "Pão de brioche, hambúrguer artesanal smash, queijo cheddar, alface, tomate e molho especial." }),
    mk("Smash Bacon", "Smash Burgers", "Salgados", 21.99, { description: "Pão de brioche, hambúrguer artesanal smash, bacon crocante, queijo cheddar, alface, tomate e molho especial." }),
    mk("Smash Egg", "Smash Burgers", "Salgados", 21.99, { description: "Pão de brioche, hambúrguer artesanal smash, ovo na chapa, queijo cheddar, alface, tomate e molho especial." }),
    mk("Smash Salada", "Smash Burgers", "Salgados", 21.99, { description: "Pão de brioche, hambúrguer artesanal smash, queijo cheddar, alface, tomate e molho especial." }),
    mk("Smash Salame", "Smash Burgers", "Salgados", 22.99, { description: "Pão de brioche, hambúrguer artesanal smash, salame, queijo cheddar, Doritos, alface, tomate e molho especial." }),
    mk("Smash Bresa", "Smash Burgers", "Salgados", 21.99, { description: "Pão de brioche, hambúrguer artesanal smash, cebola, queijo cheddar, alface, tomate e molho especial." }),
    mk("Smash Bacon + Vitamina de Açaí", "Smash Burgers", "Salgados", 36.00, { description: "Pão de brioche, hambúrguer artesanal smash, bacon crocante, queijo cheddar, maionese especial e vitamina de açaí." }),
    // Carne Louca (todos em Lançamentos)
    mk("Carne Louca no Pão Francês", "Carne Louca", "Salgados", 15.00, { description: "Todos os lanches de carne louca acompanham carne desfiada e bem temperada, maionese, batata palha e purê de batata.", featured: true }),
    mk("Carne Louca Mini Baguete", "Carne Louca", "Salgados", 25.00, { description: "Todos os lanches de carne louca acompanham carne desfiada e bem temperada, maionese, batata palha e purê de batata.", featured: true }),
    mk("Carne Louca Super Baguete", "Carne Louca", "Salgados", 30.00, { description: "Todos os lanches de carne louca acompanham carne desfiada e bem temperada, maionese, batata palha e purê de batata.", featured: true }),
    mk("Batata no Pote com Carne Louca", "Carne Louca", "Salgados", 20.00, { description: "Todos os lanches de carne louca acompanham carne desfiada e bem temperada, maionese, batata palha e purê de batata.", featured: true }),
    // Porções
    mk("Batata Rústica P", "Porções", "Salgados", 12.99, { description: "Acompanha ketchup." }),
    mk("Fritas Pequena", "Porções", "Salgados", 9.99, { description: "Acompanha ketchup." }),
    mk("Fritas GG", "Porções", "Salgados", 25.99, { description: "Acompanha cheddar, catupiry, ketchup e bacon." }),
    mk("Calabresa Acebolada Pequena", "Porções", "Salgados", 10.99, { description: "Calabresa grelhada com cebola, acompanha ketchup." }),
    mk("Calabresa Acebolada GG", "Porções", "Salgados", 29.99, { description: "Calabresa grelhada com cebola, acompanha ketchup." }),
    // Combos
    mk("Combo do Cheff 2", "Combos do Chef", "Salgados", 50.99, { description: "3 X-Salada + batata frita completa (cheddar, catupiry e bacon) + calabresa acebolada." }),
    mk("Combo do Cheff 3", "Combos do Chef", "Salgados", 34.99, { description: "2 X-Burguer + batata frita." }),
    mk("Combo do Cheff 4", "Combos do Chef", "Salgados", 80.99, { description: "5 X-Bacon + fritas completas com cheddar, catupiry e bacon. Mais Pedido!" }),
    mk("Combo do Cheff 5", "Combos do Chef", "Salgados", 86.99, { description: "6 X-Salada + fritas completas + porção de onion rings." }),
    mk("Combo Artesanal", "Combos do Chef", "Salgados", 59.99, { description: "1 hambúrguer artesanal + batata frita + refrigerante." }),
    mk("Combo Família 2", "Combos do Chef", "Salgados", 105.00, { description: "4 X-Salada + fritas completas + calabresa acebolada + refrigerante Dolly 2L." }),
    mk("Combo Família na Caixa", "Combos do Chef", "Salgados", 95.00, { description: "Hambúrgueres, fritas completas, calabresa acebolada e refrigerante." }),
    // Barcas
    mk("Barca de Batata Pequena", "Barcas", "Salgados", 23.99, { description: "Batata frita coberta com cheddar, catupiry, ketchup e bacon crocante." }),
    mk("Barca de Batata Grande", "Barcas", "Salgados", 47.99, { description: "Batata frita coberta com cheddar, catupiry, ketchup e bacon crocante — porção maior." }),
    mk("Barca Mista Pequena", "Barcas", "Salgados", 27.99, { description: "Batata frita com cheddar, catupiry, ketchup, bacon e calabresa acebolada." }),
    mk("Barca Mista Grande", "Barcas", "Salgados", 57.99, { description: "Porção grande de batata frita com cheddar, catupiry, ketchup, bacon e calabresa acebolada. Ideal p/ compartilhar." }),
    mk("Barca de Churrasco P", "Barcas", "Salgados", 87.99, { description: "Contra-filé, filé de frango, linguiça e queijo coalho grelhados." }),
    mk("Barca de Churrasco G", "Barcas", "Salgados", 143.00, { description: "Contra-filé, filé de frango, linguiça, queijo coalho, batata frita e farofa. Serve até 4 pessoas. Ideal p/ compartilhar." }),
    mk("Barca para 2 Pessoas", "Barcas", "Salgados", 69.99, { description: "1 Barca com 2 X-Saladas, fritas (ketchup e Catupiry). Acompanha 2 refrigerantes de 200ml. Serve 2 pessoas.", featured: true }),
    mk("Barca Solo + Refri 200ml", "Barcas", "Salgados", 59.99, { description: "1 X-Salada, porção de fritas completa (cheddar, Catupiry e bacon), porção de calabresa acebolada. Acompanha refrigerante 200ml. Serve 1 pessoa.", featured: true }),
    mk("10 X Salada", "Promoções", "Salgados", 100.00, { description: "10 unidades de X Salada 75g da promoção (pão de hambúrguer, queijo cheddar, salada e tomate)." }),
    mk("Molhos e ingredientes", "Avisos", "Salgados", 0.01, { description: "Nossos lanches têm na descrição os molhos e ingredientes; caso o cliente não coloque nenhuma observação, será servido no padrão da casa." }),
    // Açaí
    mk("Açaí 350g", "Açaí", "Doces", 12.99, { description: "1 fruta e 2 acompanhamentos (leite condensado, leite ninho, granola ou paçoca)." }),
    mk("Açaí 500g", "Açaí", "Doces", 18.99, { description: "1 fruta e 2 acompanhamentos (leite condensado, leite ninho, granola ou paçoca)." }),
    mk("Açaí 700g", "Açaí", "Doces", 23.99, { description: "1 fruta e 2 acompanhamentos (leite condensado, leite ninho, granola ou paçoca)." }),
    mk("Barca de Açaí Pequena", "Açaí", "Doces", 29.99, {}),
    mk("Roleta de Açaí", "Açaí", "Doces", 25.99, {}),
    // Cupuaçu
    mk("Cupuaçu 350ml", "Cupuaçu", "Doces", 12.99, { description: "1 fruta e 2 acompanhamentos (leite condensado, leite ninho, granola ou paçoca)." }),
    mk("Cupuaçu 500ml", "Cupuaçu", "Doces", 18.99, { description: "1 fruta e 2 acompanhamentos (leite condensado, leite ninho, granola ou paçoca)." }),
    mk("Cupuaçu 700ml", "Cupuaçu", "Doces", 23.99, { description: "1 fruta e 2 acompanhamentos (leite condensado, leite ninho, granola ou paçoca)." }),
    // Creme de Morango
    mk("Creme de Morango 350ml", "Creme de Morango", "Doces", 12.99, { description: "1 fruta e 2 acompanhamentos (leite condensado, leite ninho, granola ou paçoca)." }),
    mk("Creme de Morango 500ml", "Creme de Morango", "Doces", 18.99, { description: "1 fruta e 2 acompanhamentos (leite condensado, leite ninho, granola ou paçoca)." }),
    mk("Creme de Morango 700ml", "Creme de Morango", "Doces", 23.99, { description: "1 fruta e 2 acompanhamentos (leite condensado, leite ninho, granola ou paçoca)." }),
    // Vitamina de Açaí
    mk("Vitamina de Açaí 300ml", "Vitamina de Açaí", "Doces", 12.99, { description: "1 fruta + leite condensado." }),
    mk("Vitamina de Açaí 500ml", "Vitamina de Açaí", "Doces", 17.99, { description: "1 fruta + leite condensado." }),
    // Complementos
    mk("Nutella", "Complementos", "Doces", 4.99, {}),
    mk("M&M", "Complementos", "Doces", 2.99, {}),
    mk("Bala de Goma", "Complementos", "Doces", 1.99, {}),
    mk("Leite Condensado", "Complementos", "Doces", 1.99, {}),
    mk("Leite em Pó", "Complementos", "Doces", 1.99, {}),
    mk("Granola", "Complementos", "Doces", 1.99, {}),
    mk("Sucrilhos", "Complementos", "Doces", 1.99, {}),
    mk("Ovomaltine", "Complementos", "Doces", 1.99, {}),
    mk("Paçoca", "Complementos", "Doces", 1.99, {}),
    mk("Morango", "Complementos", "Doces", 1.99, {}),
    mk("Banana", "Complementos", "Doces", 1.99, {}),
    mk("Cupuaçu", "Complementos", "Doces", 5.00, {}),
    mk("Creme de Morango", "Complementos", "Doces", 5.00, {}),
    // Bebidas
    mk("Água Mineral", "Bebidas", "Bebidas", 5.00, {}),
    mk("Água Tônica Antarctica 350ml", "Bebidas", "Bebidas", 10.00, {}),
    mk("Budweiser Long Neck", "Bebidas", "Bebidas", 9.00, {}),
    mk("Cerveja Amstel 269ml", "Bebidas", "Bebidas", 49.99, {}),
    mk("Cerveja Brahma Duplo Malte", "Bebidas", "Bebidas", 7.00, {}),
    mk("Cerveja Heineken 600ml", "Bebidas", "Bebidas", 10.99, {}),
    mk("Cerveja Itaipava", "Bebidas", "Bebidas", 5.00, {}),
    mk("Cerveja Skol Lata", "Bebidas", "Bebidas", 6.00, {}),
    mk("Cerveja Skol Pack 15", "Bebidas", "Bebidas", 59.99, {}),
  ];
}

function currentMonthKey() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
}

function seedSettings() {
  return {
    storeName: "O Cozinheiro de Ouro",
    pixKey: "+55 11 96972-0459",
    whatsapp: "5511932154659",
    neighborhoods: [
      { id: uid("b"), name: "Jardim Roberto", fee: 5 },
      { id: uid("b"), name: "Bandeiras", fee: 5 },
      { id: uid("b"), name: "Veloso", fee: 5 },
      { id: uid("b"), name: "Padroeira", fee: 5 },
      { id: uid("b"), name: "Vila Yolanda", fee: 6 },
      { id: uid("b"), name: "Santo Antônio", fee: 5 },
      { id: uid("b"), name: "Bela Vista", fee: 6 },
      { id: uid("b"), name: "Pestana", fee: 5 },
      { id: uid("b"), name: "Quitaúna", fee: 7 },
      { id: uid("b"), name: "Km 18", fee: 7 },
      { id: uid("b"), name: "São Pedro", fee: 7 },
    ],
    prepTime: {
      standard: "25 a 30 minutos", // domingo a quinta
      weekend: "30 a 50 minutos", // sexta e sábado
    },
    hours: {
      0: { enabled: true, open: "18:00", close: "24:00" }, // domingo
      1: { enabled: false, open: "18:00", close: "24:00" }, // segunda (fechado)
      2: { enabled: true, open: "18:00", close: "24:00" },
      3: { enabled: true, open: "18:00", close: "24:00" },
      4: { enabled: true, open: "18:00", close: "24:00" },
      5: { enabled: true, open: "14:00", close: "04:00" },
      6: { enabled: true, open: "14:00", close: "04:00" },
    },
    manualOverride: "auto", // 'auto' | 'open' | 'closed'
  };
}

function isStoreOpenNow(settings) {
  if (!settings) return false;
  if (settings.manualOverride === "open") return true;
  if (settings.manualOverride === "closed") return false;
  const now = new Date();
  const day = now.getDay();
  const cfg = settings.hours[day];
  if (!cfg || !cfg.enabled) return false;
  const [oh, om] = cfg.open.split(":").map(Number);
  const [ch, cm] = cfg.close.split(":").map(Number);
  const openMin = oh * 60 + om;
  let closeMin = ch * 60 + cm;
  const nowMin = now.getHours() * 60 + now.getMinutes();
  if (closeMin <= openMin) {
    // crosses midnight
    closeMin += 24 * 60;
    const nowAdj = nowMin < openMin ? nowMin + 24 * 60 : nowMin;
    return nowAdj >= openMin && nowAdj < closeMin;
  }
  return nowMin >= openMin && nowMin < closeMin;
}

// re-renderiza quem usar esse hook a cada X ms, pra "Aberto/Fechado" se atualizar sozinho
// sem precisar recarregar a página
function useClockTick(intervalMs = 30000) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
}

function getPrepTimeLabel(settings) {
  if (!settings?.prepTime) return null;
  const day = new Date().getDay(); // 0=domingo ... 5=sexta, 6=sábado
  const isWeekend = day === 5 || day === 6;
  return isWeekend ? settings.prepTime.weekend : settings.prepTime.standard;
}

const STATUS_STEPS = [
  { key: "recebido", label: "Pedido recebido", icon: Package },
  { key: "preparo", label: "Em preparação", icon: ChefHat },
  { key: "entregador", label: "Saiu para entrega", icon: Truck },
  { key: "entregue", label: "Entregue", icon: CheckCircle2 },
];

const DAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function money(v) {
  return "R$ " + Number(v).toFixed(2).replace(".", ",");
}

function formatPhone(raw) {
  const digits = (raw || "").replace(/\D/g, "").replace(/^55/, "");
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return raw;
}

// ---------- Storage helpers ----------
import { initializeApp } from "firebase/app";
import { initializeFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig.js";

const firebaseApp = initializeApp(firebaseConfig);
const db = initializeFirestore(firebaseApp, {
  experimentalAutoDetectLongPolling: true,
});

async function loadKey(key, fallback) {
  try {
    const snap = await getDoc(doc(db, "store", key));
    return snap.exists() ? snap.data().value : fallback;
  } catch (e) {
    console.error("storage read error", e);
    return fallback;
  }
}
async function saveKey(key, value) {
  try {
    await setDoc(doc(db, "store", key), { value });
  } catch (e) {
    console.error("storage write error", e);
  }
}

function withTimeout(promise, ms, fallback) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

// ================= MAIN APP =================
export default function App() {
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [orders, setOrders] = useState([]);
  const [adminAuth, setAdminAuth] = useState(null);

  const isAdminLink = typeof window !== "undefined" && /admin/i.test(window.location.hash || "");
  const [view, setView] = useState(isAdminLink ? "admin" : "store");
  const [activeCategory, setActiveCategory] = useState("Lançamentos");
  const [cart, setCart] = useState([]); // [{productId, qty}]
  const [lastOrder, setLastOrder] = useState(null);
  const [syncIssue, setSyncIssue] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  function showToast(msg) {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2200);
  }
  const [isAdmin, setIsAdmin] = useState(false);

  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const TIMEOUT_MS = 9000;
      let p = await withTimeout(loadKey("products", null), TIMEOUT_MS, "TIMEOUT");
      let s = await withTimeout(loadKey("settings", null), TIMEOUT_MS, "TIMEOUT");
      let o = await withTimeout(loadKey("orders", []), TIMEOUT_MS, []);
      let a = await withTimeout(loadKey("admin-auth", null), TIMEOUT_MS, null);

      if (p === "TIMEOUT" || s === "TIMEOUT") {
        if (!cancelled) {
          setLoadError(true);
          setLoading(false);
        }
        return;
      }

      if (!p) {
        p = seedProducts();
        await saveKey("products", p);
      }
      if (!s) {
        s = seedSettings();
        await saveKey("settings", s);
      }
      if (!cancelled) {
        setProducts(p);
        setSettings(s);
        setOrders(o);
        setAdminAuth(a);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const persistProducts = useCallback(async (next) => {
    setProducts(next);
    await saveKey("products", next);
  }, []);
  const persistSettings = useCallback(async (next) => {
    setSettings(next);
    await saveKey("settings", next);
  }, []);
  const persistOrders = useCallback(async (next) => {
    setOrders(next);
    await saveKey("orders", next);
  }, []);
  const refreshOrders = useCallback(async () => {
    const fresh = await loadKey("orders", []);
    setOrders(fresh);
    return fresh;
  }, []);
  const persistAuth = useCallback(async (next) => {
    setAdminAuth(next);
    await saveKey("admin-auth", next);
  }, []);

  const cartItems = useMemo(() => {
    return cart
      .map((c) => {
        const prod = products.find((p) => p.id === c.productId);
        return prod ? { ...prod, qty: c.qty } : null;
      })
      .filter(Boolean);
  }, [cart, products]);

  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, it) => sum + it.price * it.qty, 0),
    [cartItems]
  );
  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);

  function addToCart(productId) {
    setCart((prev) => {
      const existing = prev.find((c) => c.productId === productId);
      if (existing) {
        return prev.map((c) => (c.productId === productId ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { productId, qty: 1 }];
    });
    showToast("✅ Produto adicionado ao carrinho com sucesso!");
  }
  function changeQty(productId, delta) {
    setCart((prev) =>
      prev
        .map((c) => (c.productId === productId ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }
  function removeFromCart(productId) {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
  }

  function isFirstOrderForPhone(phone) {
    const norm = normalizePhone(phone);
    if (!norm) return false;
    return !orders.some((o) => normalizePhone(o.phone) === norm);
  }

  function buildWhatsAppMessage(order) {
    const dt = new Date(order.createdAt);
    const dateStr = dt.toLocaleDateString("pt-BR");
    const timeStr = dt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    const paymentLine =
      order.paymentMethod === "dinheiro"
        ? order.changeFor != null
          ? `💵 *Dinheiro* — troco para ${money(order.changeFor)} (levar ${money(order.changeAmount)} de troco)`
          : `💵 *Dinheiro* — valor exato, sem troco`
        : order.paymentMethod === "pix"
        ? `📱 *Pix*`
        : order.paymentMethod === "credito"
        ? `💳 *Cartão de Crédito* (maquininha na entrega)`
        : `💳 *Cartão de Débito* (maquininha na entrega)`;

    const deliveryBlock =
      order.deliveryMethod === "entrega"
        ? [
            `🛵 *Delivery* (taxa de: ${order.freeDelivery ? "grátis 🎁" : money(order.deliveryFee)})`,
            `🏠 ${order.address}, ${order.neighborhood}${
              order.reference ? `\n📍 Referência: ${order.reference}` : ""
            }`,
          ]
        : [`🏠 *Retirada no local*`];

    const lines = [
      `Seu pedido está sendo processado! ✅`,
      ``,
      `📅 ${dateStr} às ${timeStr}`,
      ``,
      `*Itens:*`,
      ...order.items.map((it) => `➡ \`\`\`${it.qty}x ${it.name}\`\`\``),
      ``,
      `👤 *Cliente:* ${order.name}`,
      `📱 *Celular:* ${order.phone}`,
      ``,
      paymentLine,
      ``,
      ...deliveryBlock,
      ``,
      order.pixDiscount > 0 ? `Desconto Pix (5%): -${money(order.pixDiscount)}` : null,
      `*Total: ${money(order.total)}*`,
      ``,
      `Obrigado pela preferência, se precisar de algo é só chamar! 😉`,
    ].filter((l) => l !== null);
    return lines.join("\n");
  }

  // orderDraft vem do checkout; waWindow é a aba já aberta (gesto do usuário) pra evitar bloqueio de pop-up
  async function finalizeOrder(orderDraft, waWindow) {
    const now = new Date();
    const freeDelivery = isFirstOrderForPhone(orderDraft.phone);
    const pixDiscount = orderDraft.paymentMethod === "pix" ? Math.round(orderDraft.subtotal * 0.05 * 100) / 100 : 0;
    const deliveryFee = freeDelivery ? 0 : orderDraft.deliveryFee;
    const total = Math.round((orderDraft.subtotal - pixDiscount + deliveryFee) * 100) / 100;

    const changeAmount =
      orderDraft.paymentMethod === "dinheiro" && orderDraft.changeFor != null
        ? Math.round((orderDraft.changeFor - total) * 100) / 100
        : null;

    const order = {
      id: uid("ord"),
      ...orderDraft,
      deliveryFee,
      freeDelivery,
      pixDiscount,
      changeAmount,
      total,
      createdAt: now.toISOString(),
      status: "recebido",
      paid: false,
    };

    // bump sold counters
    const mKey = currentMonthKey();
    const nextProducts = products.map((p) => {
      const line = orderDraft.items.find((it) => it.productId === p.id);
      if (!line) return p;
      const sameMonth = p.soldMonth === mKey;
      return {
        ...p,
        soldMonth: mKey,
        sold: (sameMonth ? p.sold : 0) + line.qty,
      };
    });
    await persistProducts(nextProducts);

    // busca a lista mais atual de pedidos direto da "gaveta" compartilhada antes de gravar —
    // evita que dois pedidos feitos quase ao mesmo tempo se sobrescrevam um ao outro
    const latestOrders = await loadKey("orders", orders);
    const nextOrders = [order, ...latestOrders];
    await persistOrders(nextOrders);

    // confere se o pedido realmente foi salvo na "gaveta" compartilhada (às vezes a permissão
    // de armazenamento do navegador falha silenciosamente na primeira vez de um visitante novo,
    // ou outro pedido concorrente se intromete)
    let confirmed = false;
    for (let attempt = 0; attempt < 3 && !confirmed; attempt++) {
      const check = await loadKey("orders", []);
      confirmed = check.some((o) => o.id === order.id);
      if (!confirmed && attempt < 2) {
        await new Promise((r) => setTimeout(r, 400));
        const retryLatest = await loadKey("orders", check);
        const alreadyThere = retryLatest.some((o) => o.id === order.id);
        if (!alreadyThere) {
          await saveKey("orders", [order, ...retryLatest]);
        }
      }
    }
    setSyncIssue(!confirmed);

    setLastOrder(order);
    setCart([]);

    // envia automaticamente o resumo pro WhatsApp da loja (o app abre o WhatsApp com a mensagem pronta;
    // por limitação de navegador, o próprio cliente ainda precisa tocar em "enviar" dentro do WhatsApp)
    const text = encodeURIComponent(buildWhatsAppMessage(order));
    const url = `https://wa.me/${settings.whatsapp}?text=${text}`;
    if (waWindow && !waWindow.closed) {
      waWindow.location.href = url;
    } else {
      window.open(url, "_blank");
    }

    setView("confirmation");
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: C.cream }}>
        <div className="text-center max-w-sm">
          <img src={DEFAULT_IMAGE} alt="" className="mx-auto mb-3 w-16 h-16 rounded-full" />
          <p className="font-bold mb-2" style={{ color: C.redDeep }}>
            Não conseguimos carregar o cardápio agora.
          </p>
          <p className="text-sm mb-4" style={{ color: C.gray }}>
            Pode ser a internet ou uma instabilidade momentânea. Tenta de novo.
          </p>
          <button
            onClick={() => {
              setLoadError(false);
              setLoading(true);
              setRetryCount((n) => n + 1);
            }}
            className="px-5 py-3 rounded-full font-bold"
            style={{ background: C.red, color: "#fff" }}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.cream }}>
        <div className="text-center">
          <img src={DEFAULT_IMAGE} alt="" className="mx-auto mb-3 w-16 h-16 rounded-full animate-pulse" />
          <p style={{ color: C.gray }}>Carregando cardápio…</p>
        </div>
      </div>
    );
  }

  // A rota /#admin é o único caminho para o painel — não existe link nem botão visível
  // para ela dentro da loja, conforme pedido (link do cliente e link do admin são separados).
  if (view === "admin") {
    return (
      <div className="min-h-screen" style={{ background: C.cream, fontFamily: "system-ui, sans-serif" }}>
        <AdminGate
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          adminAuth={adminAuth}
          persistAuth={persistAuth}
          products={products}
          persistProducts={persistProducts}
          settings={settings}
          persistSettings={persistSettings}
          orders={orders}
          persistOrders={persistOrders}
          refreshOrders={refreshOrders}
          setView={setView}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: C.cream, fontFamily: "system-ui, sans-serif" }}>
      <TopBar settings={settings} view={view} setView={setView} cartCount={cartCount} />

      {view === "store" && (
        <StoreView
          products={products}
          settings={settings}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          addToCart={addToCart}
          setView={setView}
        />
      )}

      {view === "cart" && (
        <CartView
          cartItems={cartItems}
          changeQty={changeQty}
          removeFromCart={removeFromCart}
          subtotal={cartSubtotal}
          setView={setView}
        />
      )}

      {view === "checkout" && (
        <CheckoutView
          cartItems={cartItems}
          subtotal={cartSubtotal}
          settings={settings}
          orders={orders}
          setView={setView}
          finalizeOrder={finalizeOrder}
        />
      )}

      {view === "confirmation" && lastOrder && (
        <ConfirmationView order={lastOrder} settings={settings} setView={setView} syncIssue={syncIssue} />
      )}

      {view === "track" && <TrackView orders={orders} setView={setView} />}

      <FloatingWhatsApp settings={settings} />
      <Toast message={toast} />
      {isAdmin && (
        <button
          onClick={() => setView("admin")}
          className="fixed bottom-5 left-5 z-50 text-xs font-bold px-3 py-2 rounded-full shadow-lg"
          style={{ background: C.ink, color: "#fff" }}
        >
          ⚙ Voltar ao painel
        </button>
      )}

      <SecretAdminFooter onUnlock={() => setView("admin")} />
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full font-bold text-sm shadow-lg"
      style={{ background: C.ink, color: "#fff" }}
    >
      {message}
    </div>
  );
}

function SecretAdminFooter({ onUnlock }) {
  const countRef = useRef(0);
  const timerRef = useRef(null);

  function handleTap() {
    countRef.current += 1;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      countRef.current = 0;
    }, 3000);
    if (countRef.current >= 5) {
      countRef.current = 0;
      onUnlock();
    }
  }

  return (
    <footer
      onClick={handleTap}
      className="text-center py-6 text-xs select-none"
      style={{ color: C.gray }}
    >
      Protótipo de plataforma — pagamentos informativos, sem processamento bancário real.
    </footer>
  );
}

function FloatingWhatsApp({ settings }) {
  return (
    <a
      href={`https://wa.me/${settings.whatsapp}`}
      target="_blank"
      rel="noopener"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full shadow-lg"
      style={{ background: C.green, width: 58, height: 58, boxShadow: "0 8px 24px rgba(37,211,102,0.45)" }}
      title="Falar no WhatsApp"
    >
      <MessageCircle size={28} color="#fff" />
    </a>
  );
}

// ================= TOP BAR =================
function TopBar({ settings, view, setView, cartCount }) {
  useClockTick();

  const open = isStoreOpenNow(settings);
  return (
    <div className="sticky top-0 z-40" style={{ background: "#fff", borderBottom: `3px solid ${C.red}` }}>
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <button
          onClick={() => setView("store")}
          className="flex items-center gap-2 font-extrabold text-lg"
          style={{ color: C.ink }}
        >
          <img src={DEFAULT_IMAGE} alt="Logo" className="rounded-full" style={{ width: 42, height: 42, border: `2px solid ${C.red}` }} />
          O COZINHEIRO <span style={{ color: C.red }}>DE OURO</span>
        </button>

        <div className="flex items-center gap-2">
          <span
            className="hidden sm:flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full"
            style={{
              background: open ? "#E8F8EE" : "#FBE9E9",
              color: open ? "#1E8E4A" : C.redDeep,
            }}
          >
            <Circle size={8} fill={open ? "#1E8E4A" : C.redDeep} stroke="none" />
            {open ? "Aberto agora" : "Fechado no momento"}
          </span>

          <button
            onClick={() => setView("track")}
            className="text-xs font-bold px-3 py-2 rounded-full"
            style={{ border: `1px solid ${C.line}`, color: C.ink }}
          >
            Meu pedido
          </button>

          <button
            onClick={() => setView("cart")}
            className="relative p-2 rounded-full"
            style={{ background: C.red, color: "#fff" }}
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                style={{ background: C.gold, color: C.ink }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= STORE VIEW =================
function StoreView({ products, settings, activeCategory, setActiveCategory, addToCart, setView }) {
  useClockTick();
  const open = isStoreOpenNow(settings);

  const items = useMemo(() => {
    return products.filter((p) => {
      if (!p.active) return false;
      if (activeCategory === "Lançamentos") return !!p.featured;
      return p.subcategory === activeCategory;
    });
  }, [products, activeCategory]);

  return (
    <div className="max-w-3xl mx-auto px-4 pb-24">
      <div className="text-center py-8">
        <img src={DEFAULT_IMAGE} alt="Logo" className="mx-auto mb-3 rounded-full" style={{ width: 84, height: 84, border: `3px solid ${C.red}` }} />
        <h1 className="text-2xl font-extrabold" style={{ color: C.ink }}>
          Olá! Que alegria ter você aqui 🍔💛
        </h1>
        <p className="mt-2 text-sm" style={{ color: C.gray }}>
          Seja muito bem-vindo ao nosso cardápio! Prepare-se para experimentar aquele lanche feito com carinho, na medida certa pra você. Obrigado por escolher a gente — vamos cuidar do seu pedido do início ao fim.
        </p>
        {open && getPrepTimeLabel(settings) && (
          <p className="mt-2 text-xs font-bold" style={{ color: C.red }}>
            ⏱ Tempo de preparo hoje: {getPrepTimeLabel(settings)}
          </p>
        )}
        <a
          href={`https://wa.me/${settings.whatsapp}`}
          target="_blank"
          rel="noopener"
          className="mt-3 inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full"
          style={{ background: "#E8F8EE", color: "#1E8E4A" }}
        >
          <MessageCircle size={16} /> {formatPhone(settings.whatsapp)}
        </a>
        {!open && (
          <div
            className="mt-4 inline-block px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: "#FBE9E9", color: C.redDeep }}
          >
            Estamos fechados neste momento. Você pode navegar pelo cardápio, mas os pedidos abrem no nosso próximo horário de funcionamento.
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 sticky top-[64px] z-30" style={{ background: C.cream }}>
        {FLAT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap"
            style={
              activeCategory === cat
                ? { background: C.red, color: "#fff" }
                : { background: "#fff", color: C.ink, border: `1px solid ${C.line}` }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-center py-10" style={{ color: C.gray }}>
          Nenhum produto disponível nessa categoria no momento.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={() => addToCart(p.id)} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <div
      className="rounded-xl p-4 flex gap-3"
      style={{ background: "#fff", border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.red}` }}
    >
      <img
        src={product.image || DEFAULT_IMAGE}
        alt={product.name}
        className="rounded-lg object-cover flex-shrink-0"
        style={{ width: 64, height: 64, border: `1px solid ${C.line}` }}
      />
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-extrabold" style={{ color: C.ink }}>
              {product.name}
            </h3>
            <span className="font-extrabold whitespace-nowrap" style={{ color: C.red }}>
              {money(product.price)}
            </span>
          </div>
          {product.description && (
            <p className="text-xs mt-1" style={{ color: C.gray }}>
              {product.description}
            </p>
          )}
          {product.ingredients && (
            <p className="text-xs mt-1 italic" style={{ color: C.gray }}>
              Ingredientes: {product.ingredients}
            </p>
          )}
        </div>
        <button
          onClick={onAdd}
          className="mt-3 self-start flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-full"
          style={{ background: C.ink, color: "#fff" }}
        >
        <Plus size={14} /> Adicionar
      </button>
      </div>
    </div>
  );
}

// ================= CART VIEW =================
function CartView({ cartItems, changeQty, removeFromCart, subtotal, setView }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <BackBtn onClick={() => setView("store")} label="Continuar comprando" />
      <h2 className="text-xl font-extrabold mb-4" style={{ color: C.ink }}>
        Seu carrinho
      </h2>

      {cartItems.length === 0 ? (
        <p style={{ color: C.gray }}>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-3">
            {cartItems.map((it) => (
              <div
                key={it.id}
                className="flex items-center justify-between gap-3 rounded-xl p-3"
                style={{ background: "#fff", border: `1px solid ${C.line}` }}
              >
                <div>
                  <p className="font-bold" style={{ color: C.ink }}>
                    {it.name}
                  </p>
                  <p className="text-xs" style={{ color: C.gray }}>
                    {money(it.price)} cada
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => changeQty(it.id, -1)} className="p-1 rounded-full" style={{ border: `1px solid ${C.line}` }}>
                    <Minus size={14} />
                  </button>
                  <span className="font-bold w-5 text-center">{it.qty}</span>
                  <button onClick={() => changeQty(it.id, 1)} className="p-1 rounded-full" style={{ border: `1px solid ${C.line}` }}>
                    <Plus size={14} />
                  </button>
                  <button onClick={() => removeFromCart(it.id)} className="p-1 ml-1" style={{ color: C.redDeep }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between font-extrabold text-lg">
            <span>Subtotal</span>
            <span style={{ color: C.red }}>{money(subtotal)}</span>
          </div>

          <button
            onClick={() => setView("checkout")}
            className="mt-4 w-full py-3 rounded-full font-extrabold"
            style={{ background: C.red, color: "#fff" }}
          >
            Continuar para entrega
          </button>
        </>
      )}
    </div>
  );
}

function BackBtn({ onClick, label }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-sm font-bold mb-4" style={{ color: C.gray }}>
      <ChevronLeft size={16} /> {label}
    </button>
  );
}

// ================= CHECKOUT VIEW =================
function CheckoutView({ cartItems, subtotal, settings, orders, setView, finalizeOrder }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("entrega"); // entrega | retirada
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [reference, setReference] = useState("");
  const [neighborhoodId, setNeighborhoodId] = useState(settings.neighborhoods[0]?.id || "");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [changeFor, setChangeFor] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const neighborhood = settings.neighborhoods.find((n) => n.id === neighborhoodId);
  const baseFee = deliveryMethod === "entrega" ? neighborhood?.fee || 0 : 0;

  const normPhone = normalizePhone(phone);
  const isFirstOrder = normPhone.length >= 8 && !orders.some((o) => normalizePhone(o.phone) === normPhone);
  const fee = isFirstOrder ? 0 : baseFee;
  const pixDiscount = paymentMethod === "pix" ? Math.round(subtotal * 0.05 * 100) / 100 : 0;
  const total = Math.round((subtotal - pixDiscount + fee) * 100) / 100;
  const changeForNum = changeFor.trim() === "" ? null : parseFloat(changeFor);

  function submit() {
    if (!name.trim() || !phone.trim()) {
      setError("Preenche seu nome e celular pra gente conseguir te avisar sobre o pedido.");
      return;
    }
    if (deliveryMethod === "entrega" && (!street.trim() || !number.trim())) {
      setError("Preenche pelo menos a rua e o número do endereço de entrega.");
      return;
    }
    if (paymentMethod === "dinheiro" && changeForNum !== null && changeForNum < total) {
      setError("O valor informado pro troco é menor que o total do pedido.");
      return;
    }
    setError("");
    setSubmitting(true);
    // abre a aba do WhatsApp já aqui (dentro do clique do usuário), pra não ser bloqueada pelo navegador;
    // o endereço final da aba é preenchido depois que o pedido é confirmado.
    const waWindow = window.open("", "_blank");
    const fullAddress =
      deliveryMethod === "entrega"
        ? `${street.trim()}, ${number.trim()}${complement.trim() ? " — " + complement.trim() : ""}`
        : "Retirada no local";
    finalizeOrder(
      {
        name: name.trim(),
        phone: phone.trim(),
        deliveryMethod,
        street: street.trim(),
        number: number.trim(),
        complement: complement.trim(),
        reference: reference.trim(),
        address: fullAddress,
        neighborhood: deliveryMethod === "entrega" ? neighborhood?.name : "-",
        deliveryFee: baseFee,
        items: cartItems.map((it) => ({ productId: it.id, name: it.name, price: it.price, qty: it.qty })),
        subtotal,
        paymentMethod,
        changeFor: paymentMethod === "dinheiro" && changeForNum !== null ? changeForNum : null,
      },
      waWindow
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <BackBtn onClick={() => setView("cart")} label="Voltar ao carrinho" />
      <div className="rounded-xl p-4 mb-4" style={{ background: "#FFF3D6" }}>
        <p className="text-sm font-bold" style={{ color: C.ink }}>
          Olá, muito obrigado! Seja muito bem-vindo ao nosso portal de compras 💛
        </p>
        <p className="text-xs mt-1" style={{ color: C.gray }}>
          Falta pouco! Preenche os dados abaixo certinho pra gente entregar seu pedido rapidinho.
        </p>
      </div>
      <h2 className="text-xl font-extrabold mb-4" style={{ color: C.ink }}>
        Dados de entrega
      </h2>

      <div className="space-y-3">
        <Field label="Nome" icon={User}>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full outline-none" placeholder="Seu nome" />
        </Field>
        <Field label="Celular / WhatsApp" icon={Phone}>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full outline-none" placeholder="(11) 90000-0000" />
        </Field>
        {isFirstOrder && (
          <div className="flex items-center gap-2 text-xs font-bold rounded-xl p-3" style={{ background: "#E8F8EE", color: "#1E8E4A" }}>
            <Gift size={16} /> Primeiro pedido — entrega grátis! 🎉
          </div>
        )}

        <div className="flex gap-2">
          <ChoiceBtn active={deliveryMethod === "entrega"} onClick={() => setDeliveryMethod("entrega")}>
            Entrega
          </ChoiceBtn>
          <ChoiceBtn active={deliveryMethod === "retirada"} onClick={() => setDeliveryMethod("retirada")}>
            Retirada no local
          </ChoiceBtn>
        </div>

        {deliveryMethod === "entrega" && (
          <>
            <Field label="Rua" icon={MapPin}>
              <input value={street} onChange={(e) => setStreet(e.target.value)} className="w-full outline-none" placeholder="Nome da rua" />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Número" icon={MapPin}>
                <input value={number} onChange={(e) => setNumber(e.target.value)} className="w-full outline-none" placeholder="Nº" />
              </Field>
              <Field label="Complemento (opcional)" icon={MapPin}>
                <input value={complement} onChange={(e) => setComplement(e.target.value)} className="w-full outline-none" placeholder="Apto, bloco..." />
              </Field>
            </div>
            <div>
              <label className="text-xs font-bold" style={{ color: C.gray }}>
                Bairro
              </label>
              <select
                value={neighborhoodId}
                onChange={(e) => setNeighborhoodId(e.target.value)}
                className="w-full mt-1 p-3 rounded-xl"
                style={{ border: `1px solid ${C.line}` }}
              >
                {settings.neighborhoods.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name} — taxa {money(n.fee)}
                  </option>
                ))}
              </select>
            </div>
            <Field label="Ponto de referência (opcional)" icon={MapPin}>
              <input value={reference} onChange={(e) => setReference(e.target.value)} className="w-full outline-none" placeholder="Ex: perto do mercado, portão azul..." />
            </Field>
          </>
        )}

        <div>
          <label className="text-xs font-bold" style={{ color: C.gray }}>
            Forma de pagamento
          </label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {[
              { k: "pix", label: "Pix" },
              { k: "credito", label: "Cartão de Crédito" },
              { k: "debito", label: "Cartão de Débito" },
              { k: "dinheiro", label: "Dinheiro" },
            ].map((opt) => (
              <ChoiceBtn key={opt.k} active={paymentMethod === opt.k} onClick={() => setPaymentMethod(opt.k)}>
                {opt.label}
              </ChoiceBtn>
            ))}
          </div>
          {paymentMethod === "pix" && (
            <div className="mt-2 text-xs rounded-xl p-3 space-y-1" style={{ background: "#FFF3D6", color: C.ink }}>
              <p className="flex items-center gap-1 font-bold"><Tag size={13} /> 5% de desconto pagando no Pix!</p>
              <p>Chave Pix: <strong>{settings.pixKey}</strong>. Assim que fizer o Pix, envie o comprovante pelo WhatsApp da loja para darmos sequência ao seu pedido.</p>
            </div>
          )}
          {(paymentMethod === "credito" || paymentMethod === "debito") && (
            <div className="mt-2 text-xs rounded-xl p-3" style={{ background: "#F1F0FF", color: C.ink }}>
              O entregador leva a maquininha até você no momento da entrega.
            </div>
          )}
          {paymentMethod === "dinheiro" && (
            <div className="mt-2 text-xs rounded-xl p-3 space-y-2" style={{ background: "#F1F0FF", color: C.ink }}>
              <p>Vai precisar de troco? Informa pra quanto (ex: 100) — se for pagar com o valor exato, deixa em branco.</p>
              <input
                type="number"
                step="0.01"
                min="0"
                value={changeFor}
                onChange={(e) => setChangeFor(e.target.value)}
                placeholder={`Valor exato: ${money(total)}`}
                className="w-full p-2 rounded-lg outline-none"
                style={{ border: `1px solid ${C.line}` }}
              />
              {changeForNum !== null && changeForNum < total && (
                <p className="font-bold" style={{ color: C.redDeep }}>
                  O valor informado é menor que o total do pedido ({money(total)}).
                </p>
              )}
              {changeForNum !== null && changeForNum >= total && (
                <p className="font-bold" style={{ color: "#1E8E4A" }}>
                  Troco a levar: {money(changeForNum - total)}
                </p>
              )}
            </div>
          )}
        </div>

        {error && <p className="text-xs font-bold" style={{ color: C.redDeep }}>{error}</p>}

        <div className="rounded-xl p-4 mt-2" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          {pixDiscount > 0 && (
            <div className="flex justify-between text-sm mt-1" style={{ color: "#1E8E4A" }}>
              <span>Desconto Pix (5%)</span>
              <span>-{money(pixDiscount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm mt-1">
            <span>Taxa de entrega{isFirstOrder ? " (grátis no 1º pedido)" : ""}</span>
            <span>{isFirstOrder ? "R$ 0,00" : money(fee)}</span>
          </div>
          <div className="flex justify-between font-extrabold text-lg mt-2">
            <span>Total</span>
            <span style={{ color: C.red }}>{money(total)}</span>
          </div>
        </div>

        <button onClick={submit} disabled={submitting} className="w-full py-3 rounded-full font-extrabold disabled:opacity-60" style={{ background: C.red, color: "#fff" }}>
          {submitting ? "Enviando..." : "Finalizar pedido"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="text-xs font-bold" style={{ color: C.gray }}>
        {label}
      </label>
      <div className="flex items-center gap-2 mt-1 p-3 rounded-xl" style={{ border: `1px solid ${C.line}` }}>
        <Icon size={16} style={{ color: C.gray }} />
        {children}
      </div>
    </div>
  );
}

function ChoiceBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 text-xs font-bold py-2 rounded-full"
      style={active ? { background: C.ink, color: "#fff" } : { border: `1px solid ${C.line}`, color: C.ink }}
    >
      {children}
    </button>
  );
}

// ================= CONFIRMATION VIEW =================
function ConfirmationView({ order, settings, setView, syncIssue }) {
  const [copied, setCopied] = useState(false);
  const dt = new Date(order.createdAt);
  const waLink = `https://wa.me/${settings.whatsapp}`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <CheckCircle2 size={44} style={{ color: "#1E8E4A" }} className="mx-auto mb-2" />
        <h2 className="text-xl font-extrabold" style={{ color: C.ink }}>
          Muito obrigado pelo seu pedido! 💛
        </h2>
        <p className="text-sm" style={{ color: C.gray }}>
          Seja sempre muito bem-vindo — vamos preparar tudo com todo capricho pra você. Aqui está o resumo do seu pedido.
        </p>
        <p className="text-xs mt-2 font-bold" style={{ color: "#1E8E4A" }}>
          Abrimos o WhatsApp da loja com o resumo pronto — é só confirmar o envio por lá.
        </p>
        {syncIssue && (
          <div className="mt-3 text-xs rounded-xl p-3 text-left" style={{ background: "#FFF3D6", color: C.ink }}>
            <strong>Atenção:</strong> seu pedido foi registrado neste dispositivo, mas pode não ter sincronizado
            com o painel da loja. Para garantir, confirme o envio da mensagem no WhatsApp que abrimos — é
            por lá que o pedido chega com certeza até a loja.
          </div>
        )}
      </div>

      <div className="rounded-xl p-4 space-y-2" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
        <Row label="Cliente" value={order.name} />
        <Row label="Telefone" value={order.phone} />
        <Row label="Horário do pedido" value={dt.toLocaleString("pt-BR")} />
        <Row label="Forma de entrega" value={order.deliveryMethod === "entrega" ? `Entrega — ${order.address} (${order.neighborhood})${order.reference ? " · Ref: " + order.reference : ""}` : "Retirada no local"} />
        <Row label="Forma de pagamento" value={paymentLabel(order.paymentMethod)} />
        <div className="pt-2" style={{ borderTop: `1px solid ${C.line}` }}>
          {order.items.map((it, i) => (
            <div key={i} className="flex justify-between text-sm py-1">
              <span>{it.qty}x {it.name}</span>
              <span>{money(it.price * it.qty)}</span>
            </div>
          ))}
        </div>
        <div className="text-sm space-y-1 pt-2" style={{ borderTop: `1px solid ${C.line}` }}>
          <div className="flex justify-between"><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
          {order.pixDiscount > 0 && (
            <div className="flex justify-between" style={{ color: "#1E8E4A" }}><span>Desconto Pix (5%)</span><span>-{money(order.pixDiscount)}</span></div>
          )}
          <div className="flex justify-between">
            <span>Taxa de entrega{order.freeDelivery ? " (grátis 1º pedido)" : ""}</span>
            <span>{money(order.deliveryFee)}</span>
          </div>
        </div>
        <div className="flex justify-between font-extrabold text-lg pt-2" style={{ borderTop: `1px solid ${C.line}` }}>
          <span>Total</span>
          <span style={{ color: C.red }}>{money(order.total)}</span>
        </div>
      </div>

      {order.paymentMethod === "dinheiro" && (
        <div className="mt-4 rounded-xl p-4 text-sm" style={{ background: "#F1F0FF", color: C.ink }}>
          {order.changeFor != null ? (
            <p>💵 Troco para <strong>{money(order.changeFor)}</strong> — o entregador vai levar <strong>{money(order.changeAmount)}</strong> de troco.</p>
          ) : (
            <p>💵 Pagamento em dinheiro, valor exato — sem necessidade de troco.</p>
          )}
        </div>
      )}

      {order.paymentMethod === "pix" && (
        <div className="mt-4 rounded-xl p-4 text-sm" style={{ background: "#FFF3D6", color: C.ink }}>
          <p className="font-bold mb-1">Falta um passo!</p>
          <p>
            Faça o Pix para a chave <strong>{settings.pixKey}</strong> no valor de <strong>{money(order.total)}</strong> e envie o comprovante pelo WhatsApp da loja para darmos sequência ao seu pedido.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener"
            className="inline-block mt-3 px-4 py-2 rounded-full font-bold text-white"
            style={{ background: C.green }}
          >
            Enviar comprovante no WhatsApp
          </a>
        </div>
      )}

      <div className="flex gap-2 mt-6">
        <button
          onClick={() => setView("track")}
          className="flex-1 py-3 rounded-full font-extrabold"
          style={{ background: C.ink, color: "#fff" }}
        >
          Acompanhar meu pedido
        </button>
        <button
          onClick={() => setView("store")}
          className="flex-1 py-3 rounded-full font-extrabold"
          style={{ border: `1px solid ${C.line}`, color: C.ink }}
        >
          Voltar ao cardápio
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span style={{ color: C.gray }}>{label}</span>
      <span className="font-bold text-right" style={{ color: C.ink }}>{value}</span>
    </div>
  );
}

function paymentLabel(k) {
  return { pix: "Pix", credito: "Cartão de Crédito", debito: "Cartão de Débito", dinheiro: "Dinheiro" }[k] || k;
}

// ================= TRACK VIEW =================
function TrackView({ orders, setView }) {
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);
  const matches = orders.filter((o) => o.phone.replace(/\D/g, "") === phone.replace(/\D/g, "") && phone.trim() !== "");

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <BackBtn onClick={() => setView("store")} label="Voltar ao cardápio" />
      <h2 className="text-xl font-extrabold mb-4" style={{ color: C.ink }}>
        Acompanhar pedido
      </h2>
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 p-3 rounded-xl" style={{ border: `1px solid ${C.line}` }}>
          <Phone size={16} style={{ color: C.gray }} />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Digite seu celular"
            className="w-full outline-none"
          />
        </div>
        <button onClick={() => setSearched(true)} className="px-4 rounded-xl font-bold" style={{ background: C.red, color: "#fff" }}>
          <Search size={18} />
        </button>
      </div>

      {searched && matches.length === 0 && (
        <p className="mt-6 text-sm" style={{ color: C.gray }}>
          Não encontramos pedidos com esse número.
        </p>
      )}

      <div className="mt-6 space-y-6">
        {matches.map((o) => (
          <OrderStatusCard key={o.id} order={o} />
        ))}
      </div>
    </div>
  );
}

function OrderStatusCard({ order }) {
  const activeIdx = STATUS_STEPS.findIndex((s) => s.key === order.status);
  return (
    <div className="rounded-xl p-4" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
      <div className="flex justify-between text-sm mb-3">
        <span className="font-bold">Pedido de {new Date(order.createdAt).toLocaleString("pt-BR")}</span>
        <span className="font-extrabold" style={{ color: C.red }}>{money(order.total)}</span>
      </div>
      <div className="flex items-center justify-between">
        {STATUS_STEPS.map((s, i) => {
          const Icon = s.icon;
          const done = i <= activeIdx;
          return (
            <div key={s.key} className="flex-1 flex flex-col items-center text-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center mb-1"
                style={{ background: done ? C.red : "#F0EEE8", color: done ? "#fff" : C.gray }}
              >
                <Icon size={16} />
              </div>
              <span className="text-[10px] leading-tight" style={{ color: done ? C.ink : C.gray }}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ================= ADMIN =================
function AdminGate({ isAdmin, setIsAdmin, adminAuth, persistAuth, ...rest }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [mode, setMode] = useState(adminAuth ? "login" : "setup");
  const [error, setError] = useState("");

  if (isAdmin) {
    return <AdminPanel onLogout={() => setIsAdmin(false)} {...rest} />;
  }

  async function handleSetup() {
    if (!email.includes("@") || password.length < 4) {
      setError("Informe um e-mail válido e uma senha com pelo menos 4 caracteres.");
      return;
    }
    await persistAuth({ email: email.trim(), password });
    setIsAdmin(true);
  }
  function handleLogin() {
    if (adminAuth && email.trim() === adminAuth.email && password === adminAuth.password) {
      setIsAdmin(true);
    } else {
      setError("E-mail ou senha incorretos.");
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <div className="text-center mb-6">
        <Settings size={32} style={{ color: C.red }} className="mx-auto mb-2" />
        <h2 className="text-lg font-extrabold" style={{ color: C.ink }}>
          {mode === "setup" ? "Criar acesso administrativo" : "Login administrativo"}
        </h2>
      </div>
      <div className="space-y-3">
        <Field label="E-mail" icon={User}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full outline-none" placeholder="seuemail@exemplo.com" />
        </Field>
        <Field label="Senha" icon={showPw ? EyeOff : Eye}>
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none"
            placeholder="Senha"
          />
          <button onClick={() => setShowPw((v) => !v)} className="text-xs" style={{ color: C.gray }}>
            {showPw ? "ocultar" : "ver"}
          </button>
        </Field>
        {error && <p className="text-xs font-bold" style={{ color: C.redDeep }}>{error}</p>}
        <button
          onClick={mode === "setup" ? handleSetup : handleLogin}
          className="w-full py-3 rounded-full font-extrabold"
          style={{ background: C.red, color: "#fff" }}
        >
          {mode === "setup" ? "Criar acesso" : "Entrar"}
        </button>
        <p className="text-[11px] text-center" style={{ color: C.gray }}>
          Este login é local a esta plataforma (armazenamento simples), não é um sistema de autenticação bancário.
        </p>
      </div>
    </div>
  );
}

function AdminPanel({ onLogout, products, persistProducts, settings, persistSettings, orders, persistOrders, refreshOrders, setView }) {
  const [tab, setTab] = useState("dashboard");
  const [newOrderAlert, setNewOrderAlert] = useState(false);
  const knownCountRef = useRef(orders.length);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    knownCountRef.current = orders.length;
  }, [orders.length]);

  function playAlertSound() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = audioCtxRef.current || new Ctx();
      audioCtxRef.current = ctx;
      [0, 260, 520].forEach((delay) => {
        setTimeout(() => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = "sine";
          o.frequency.value = 900;
          g.gain.value = 0.25;
          o.connect(g);
          g.connect(ctx.destination);
          o.start();
          o.stop(ctx.currentTime + 0.18);
        }, delay);
      });
    } catch (e) {
      console.error("audio alert error", e);
    }
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const fresh = await refreshOrders();
      if (fresh.length > knownCountRef.current) {
        playAlertSound();
        setNewOrderAlert(true);
      }
      knownCountRef.current = fresh.length;
    }, 8000);
    return () => clearInterval(interval);
  }, [refreshOrders]);

  const tabs = [
    { k: "dashboard", label: "Painel", icon: BarChart3 },
    { k: "orders", label: "Pedidos", icon: ListOrdered },
    { k: "products", label: "Produtos", icon: Package },
    { k: "neighborhoods", label: "Bairros/Taxas", icon: MapPin },
    { k: "hours", label: "Horários", icon: Clock },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {newOrderAlert && (
        <button
          onClick={() => {
            setTab("orders");
            setNewOrderAlert(false);
          }}
          className="w-full mb-4 flex items-center justify-center gap-2 text-sm font-extrabold py-3 rounded-xl animate-pulse"
          style={{ background: "#1E8E4A", color: "#fff" }}
        >
          🔔 Novo pedido recebido! Toque para ver
        </button>
      )}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold" style={{ color: C.ink }}>Painel administrativo</h2>
        <div className="flex gap-2">
          <button onClick={() => setView("store")} className="text-xs font-bold px-3 py-2 rounded-full" style={{ border: `1px solid ${C.line}` }}>
            Ver loja
          </button>
          <button onClick={onLogout} className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-full" style={{ background: C.ink, color: "#fff" }}>
            <LogOut size={14} /> Sair
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto mb-6">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.k}
              onClick={() => {
                setTab(t.k);
                if (t.k === "orders") setNewOrderAlert(false);
              }}
              className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap"
              style={tab === t.k ? { background: C.red, color: "#fff" } : { border: `1px solid ${C.line}`, color: C.ink }}
            >
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "dashboard" && <AdminDashboard products={products} orders={orders} />}
      {tab === "orders" && <AdminOrders orders={orders} persistOrders={persistOrders} />}
      {tab === "products" && <AdminProducts products={products} persistProducts={persistProducts} />}
      {tab === "neighborhoods" && <AdminNeighborhoods settings={settings} persistSettings={persistSettings} />}
      {tab === "hours" && <AdminHours settings={settings} persistSettings={persistSettings} />}
    </div>
  );
}

function AdminDashboard({ products, orders }) {
  const mKey = currentMonthKey();
  const best = [...products]
    .filter((p) => p.soldMonth === mKey && p.sold > 0)
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 10);

  const monthOrders = orders.filter((o) => o.createdAt.slice(0, 7) === mKey);
  const revenue = monthOrders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard label="Pedidos no mês" value={monthOrders.length} />
        <StatCard label="Faturamento no mês" value={money(revenue)} />
        <StatCard label="Produtos ativos" value={products.filter((p) => p.active).length} />
      </div>

      <div>
        <h3 className="font-extrabold mb-2" style={{ color: C.ink }}>Mais vendidos no mês</h3>
        {best.length === 0 ? (
          <p className="text-sm" style={{ color: C.gray }}>Ainda não há vendas registradas este mês.</p>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.line}` }}>
            {best.map((p, i) => (
              <div key={p.id} className="flex justify-between items-center px-4 py-2" style={{ background: i % 2 ? "#fff" : C.cream }}>
                <span className="text-sm font-bold">{i + 1}. {p.name}</span>
                <span className="text-sm" style={{ color: C.red }}>{p.sold} un.</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
      <p className="text-xs" style={{ color: C.gray }}>{label}</p>
      <p className="text-xl font-extrabold" style={{ color: C.ink }}>{value}</p>
    </div>
  );
}

function AdminOrders({ orders, persistOrders }) {
  async function updateOrder(id, patch) {
    const latest = await loadKey("orders", orders);
    persistOrders(latest.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  }
  async function deleteOrder(id) {
    if (confirm("Excluir este pedido definitivamente?")) {
      const latest = await loadKey("orders", orders);
      persistOrders(latest.filter((o) => o.id !== id));
    }
  }

  return (
    <div className="space-y-3">
      {orders.length === 0 && <p className="text-sm" style={{ color: C.gray }}>Nenhum pedido ainda.</p>}
      {orders.map((o) => (
        <div key={o.id} className="rounded-xl p-4" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
          <div className="flex justify-between text-sm flex-wrap gap-2">
            <div>
              <p className="font-extrabold">{o.name} · {o.phone}</p>
              <p className="text-xs" style={{ color: C.gray }}>{new Date(o.createdAt).toLocaleString("pt-BR")}</p>
              <p className="text-xs mt-1">{o.items.map((it) => `${it.qty}x ${it.name}`).join(", ")}</p>
              <p className="text-xs mt-1" style={{ color: C.gray }}>
                {o.deliveryMethod === "entrega" ? `Entrega: ${o.address} (${o.neighborhood})${o.reference ? " · Ref: " + o.reference : ""}` : "Retirada no local"} · {paymentLabel(o.paymentMethod)}
                {o.paymentMethod === "dinheiro" && o.changeFor != null && (
                  <> · troco p/ {money(o.changeFor)} (levar {money(o.changeAmount)})</>
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="font-extrabold" style={{ color: C.red }}>{money(o.total)}</p>
              <label className="flex items-center gap-1 text-xs mt-1 justify-end">
                <input type="checkbox" checked={o.paid} onChange={(e) => updateOrder(o.id, { paid: e.target.checked })} />
                Pago
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <select
              value={o.status}
              onChange={(e) => updateOrder(o.id, { status: e.target.value })}
              className="text-xs font-bold p-2 rounded-lg"
              style={{ border: `1px solid ${C.line}` }}
            >
              {STATUS_STEPS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
            <button onClick={() => deleteOrder(o.id)} className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg" style={{ color: C.redDeep, border: `1px solid ${C.line}` }}>
              <Trash2 size={13} /> Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminProducts({ products, persistProducts }) {
  const [editingId, setEditingId] = useState(null);
  const [showNew, setShowNew] = useState(false);

  function updateProduct(id, patch) {
    persistProducts(products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }
  function deleteProduct(id) {
    if (confirm("Excluir este produto?")) {
      persistProducts(products.filter((p) => p.id !== id));
    }
  }
  function addProduct(data) {
    persistProducts([...products, { id: uid("p"), sold: 0, soldMonth: currentMonthKey(), active: true, featured: false, ...data }]);
    setShowNew(false);
  }

  const grouped = FLAT_CATEGORIES.filter((c) => c !== "Lançamentos").map((cat) => ({
    group: cat,
    items: products.filter((p) => p.subcategory === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="space-y-6">
      <button
        onClick={() => setShowNew((v) => !v)}
        className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-full"
        style={{ background: C.red, color: "#fff" }}
      >
        <Plus size={14} /> Novo produto
      </button>

      {showNew && <ProductForm onSave={addProduct} onCancel={() => setShowNew(false)} />}

      {grouped.map(({ group, items }) => (
        <div key={group}>
          <h3 className="font-extrabold mb-2" style={{ color: C.ink }}>{group}</h3>
          <div className="space-y-2">
            {items.map((p) =>
              editingId === p.id ? (
                <ProductForm
                  key={p.id}
                  initial={p}
                  onSave={(data) => {
                    updateProduct(p.id, data);
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3 rounded-xl p-3 flex-wrap"
                  style={{ background: "#fff", border: `1px solid ${C.line}`, opacity: p.active ? 1 : 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <img src={p.image || DEFAULT_IMAGE} alt="" className="rounded-lg object-cover" style={{ width: 44, height: 44, border: `1px solid ${C.line}` }} />
                    <div>
                      <p className="font-bold text-sm">{p.name} <span style={{ color: C.gray, fontWeight: 400 }}>({p.subcategory})</span></p>
                      <p className="text-xs" style={{ color: C.gray }}>{money(p.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <label className="flex items-center gap-1 text-xs">
                      <input type="checkbox" checked={!!p.featured} onChange={(e) => updateProduct(p.id, { featured: e.target.checked })} />
                      Destacar em Lançamentos
                    </label>
                    <button
                      onClick={() => updateProduct(p.id, { active: !p.active })}
                      className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ background: p.active ? "#1E8E4A" : "#B0392E", color: "#fff" }}
                    >
                      {p.active ? <Power size={12} /> : <PowerOff size={12} />}
                      {p.active ? "Ativo" : "Pausado"}
                    </button>
                    <button onClick={() => setEditingId(p.id)} className="p-1" style={{ color: C.ink }}>
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Excluir "${p.name}" definitivamente?`)) deleteProduct(p.id);
                      }}
                      className="p-1"
                      style={{ color: C.redDeep }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductForm({ initial, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [group, setGroup] = useState(initial?.group || "Salgados");
  const [subcategory, setSubcategory] = useState(initial?.subcategory || (SUBCATS["Salgados"][0]));
  const [price, setPrice] = useState(initial?.price ?? "");
  const [description, setDescription] = useState(initial?.description || "");
  const [ingredients, setIngredients] = useState(initial?.ingredients || "");
  const [featured, setFeatured] = useState(initial?.featured || false);
  const [image, setImage] = useState(initial?.image || DEFAULT_IMAGE);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const subOptions = group === "Bebidas" ? ["Bebidas"] : (SUBCATS[group] || []);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const dataUrl = await resizeImageFile(file);
      setImage(dataUrl);
    } catch (err) {
      console.error(err);
      setUploadError("Não consegui carregar essa imagem. Tenta outro arquivo (JPG, PNG ou WEBP).");
    }
    setUploading(false);
  }

  return (
    <div className="rounded-xl p-4 space-y-2" style={{ background: C.cream, border: `1px solid ${C.line}` }}>
      <div className="flex items-center gap-3">
        <img src={image} alt="" className="rounded-lg object-cover" style={{ width: 56, height: 56, border: `1px solid ${C.line}` }} />
        <div className="flex-1">
          <label
            className="flex items-center justify-center gap-1 text-xs font-bold px-3 py-2 rounded-full cursor-pointer"
            style={{ border: `1px solid ${C.line}`, color: C.ink, background: "#fff", maxWidth: 200 }}
          >
            <Upload size={13} /> {uploading ? "Carregando..." : "Selecionar arquivo"}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} className="hidden" />
          </label>
          <p className="text-[10px] mt-1" style={{ color: C.gray }}>Sem foto própria, usa o logo como padrão. Aceita JPG, PNG e WEBP.</p>
          {uploadError && <p className="text-[10px] mt-1 font-bold" style={{ color: C.redDeep }}>{uploadError}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do produto" className="p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preço" type="number" step="0.01" className="p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
        <select value={group} onChange={(e) => { setGroup(e.target.value); setSubcategory((SUBCATS[e.target.value] || ["Bebidas"])[0]); }} className="p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }}>
          <option value="Salgados">Salgados</option>
          <option value="Doces">Doces</option>
          <option value="Bebidas">Bebidas</option>
        </select>
        <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }}>
          {subOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição (opcional)" className="w-full p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
      <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredientes (opcional)" className="w-full p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
      <label className="flex items-center gap-1 text-xs">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} /> Destacar em Lançamentos
      </label>
      <div className="flex gap-2">
        <button
          onClick={() => onSave({ name: name.trim(), group, subcategory, price: parseFloat(price) || 0, description: description.trim(), ingredients: ingredients.trim(), featured, image })}
          disabled={!name.trim() || price === ""}
          className="text-xs font-bold px-3 py-2 rounded-full disabled:opacity-50"
          style={{ background: C.red, color: "#fff" }}
        >
          Salvar
        </button>
        <button onClick={onCancel} className="text-xs font-bold px-3 py-2 rounded-full" style={{ border: `1px solid ${C.line}` }}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

function AdminNeighborhoods({ settings, persistSettings }) {
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");

  function addNeighborhood() {
    if (!name.trim() || fee === "") return;
    persistSettings({
      ...settings,
      neighborhoods: [...settings.neighborhoods, { id: uid("b"), name: name.trim(), fee: parseFloat(fee) || 0 }],
    });
    setName("");
    setFee("");
  }
  function updateNeighborhood(id, patch) {
    persistSettings({
      ...settings,
      neighborhoods: settings.neighborhoods.map((n) => (n.id === id ? { ...n, ...patch } : n)),
    });
  }
  function removeNeighborhood(id) {
    persistSettings({ ...settings, neighborhoods: settings.neighborhoods.filter((n) => n.id !== id) });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl p-4" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
        <p className="text-xs font-bold mb-2" style={{ color: C.gray }}>Chave Pix exibida ao cliente</p>
        <input
          value={settings.pixKey}
          onChange={(e) => persistSettings({ ...settings, pixKey: e.target.value })}
          className="w-full p-2 rounded-lg"
          style={{ border: `1px solid ${C.line}` }}
        />
      </div>

      <div className="space-y-2">
        {settings.neighborhoods.map((n) => (
          <div key={n.id} className="flex items-center gap-2 rounded-xl p-3" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
            <input
              value={n.name}
              onChange={(e) => updateNeighborhood(n.id, { name: e.target.value })}
              className="flex-1 p-2 rounded-lg text-sm"
              style={{ border: `1px solid ${C.line}` }}
            />
            <input
              type="number"
              step="0.01"
              value={n.fee}
              onChange={(e) => updateNeighborhood(n.id, { fee: parseFloat(e.target.value) || 0 })}
              className="w-24 p-2 rounded-lg text-sm"
              style={{ border: `1px solid ${C.line}` }}
            />
            <button onClick={() => removeNeighborhood(n.id)} className="p-1" style={{ color: C.redDeep }}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Novo bairro" className="flex-1 p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
        <input type="number" step="0.01" value={fee} onChange={(e) => setFee(e.target.value)} placeholder="Taxa" className="w-24 p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
        <button onClick={addNeighborhood} className="px-3 rounded-lg font-bold text-xs" style={{ background: C.ink, color: "#fff" }}>
          Adicionar
        </button>
      </div>
    </div>
  );
}

function AdminHours({ settings, persistSettings }) {
  function updateDay(day, patch) {
    persistSettings({
      ...settings,
      hours: { ...settings.hours, [day]: { ...settings.hours[day], ...patch } },
    });
  }
  function setOverride(v) {
    persistSettings({ ...settings, manualOverride: v });
  }

  const open = isStoreOpenNow(settings);
  const now = new Date();
  const todayCfg = settings.hours[now.getDay()];

  return (
    <div className="space-y-6">
      <div className="rounded-xl p-4" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
        <p className="text-xs font-bold mb-2" style={{ color: C.gray }}>Status agora: <span style={{ color: open ? "#1E8E4A" : C.redDeep }}>{open ? "Aberto" : "Fechado"}</span></p>
        <p className="text-[11px] mb-3" style={{ color: C.gray }}>
          Modo: <strong>{settings.manualOverride === "auto" ? "Automático" : settings.manualOverride === "open" ? "Forçado aberto" : "Forçado fechado"}</strong>
          {" · "}Agora é <strong>{DAY_NAMES[now.getDay()]}, {now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</strong> (horário do seu aparelho)
          {" · "}Horário de hoje: {todayCfg.enabled ? <strong>{todayCfg.open} às {todayCfg.close}</strong> : <strong>fechado o dia todo</strong>}
        </p>
        <div className="flex gap-2 flex-wrap">
          <ChoiceBtn active={settings.manualOverride === "auto"} onClick={() => setOverride("auto")}>Automático (segue horários)</ChoiceBtn>
          <ChoiceBtn active={settings.manualOverride === "open"} onClick={() => setOverride("open")}>Forçar aberto</ChoiceBtn>
          <ChoiceBtn active={settings.manualOverride === "closed"} onClick={() => setOverride("closed")}>Forçar fechado</ChoiceBtn>
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
        <p className="text-xs font-bold mb-2" style={{ color: C.gray }}>Tempo de preparo exibido ao cliente</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[11px]" style={{ color: C.gray }}>Domingo a quinta</label>
            <input
              value={settings.prepTime?.standard || ""}
              onChange={(e) => persistSettings({ ...settings, prepTime: { ...settings.prepTime, standard: e.target.value } })}
              className="w-full p-2 rounded-lg text-sm"
              style={{ border: `1px solid ${C.line}` }}
            />
          </div>
          <div>
            <label className="text-[11px]" style={{ color: C.gray }}>Sexta e sábado</label>
            <input
              value={settings.prepTime?.weekend || ""}
              onChange={(e) => persistSettings({ ...settings, prepTime: { ...settings.prepTime, weekend: e.target.value } })}
              className="w-full p-2 rounded-lg text-sm"
              style={{ border: `1px solid ${C.line}` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {DAY_NAMES.map((dn, idx) => {
          const cfg = settings.hours[idx];
          return (
            <div key={idx} className="flex items-center gap-2 rounded-xl p-3 flex-wrap" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
              <label className="flex items-center gap-1 text-xs font-bold w-28">
                <input type="checkbox" checked={cfg.enabled} onChange={(e) => updateDay(idx, { enabled: e.target.checked })} />
                {dn}
              </label>
              <input type="time" value={cfg.open} onChange={(e) => updateDay(idx, { open: e.target.value })} className="p-2 rounded-lg text-sm" style={{ border: `1px solid ${C.line}` }} />
              <span className="text-xs" style={{ color: C.gray }}>até</span>
              <input type="time" value={cfg.close} onChange={(e) => updateDay(idx, { close: e.target.value })} className="p-2 rounded-lg text-sm" style={{ border: `1px solid ${C.line}` }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
