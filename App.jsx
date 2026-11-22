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

const SUBCATS = {
  Salgados: ["Avisos", "Promoções", "Lanches Tradicionais", "Duplo", "Artesanais", "Smash Burgers", "Carne Louca", "Porções", "Combos do Chef", "Barcas"],
  Doces: ["Açaí", "Cupuaçu", "Creme de Morango", "Vitamina de Açaí", "Complementos"],
  Bebidas: ["Bebidas"],
};

function normalizePhone(p) {
  return (p || "").replace(/\D/g, "");
}

// chave do celular usada nos documentos (só dígitos, sem o 55 do país)
function phoneKey(p) {
  let d = (p || "").replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  return d;
}

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
    prepTime: { standard: "25 a 30 minutos", weekend: "30 a 50 minutos" },
    hours: {
      0: { enabled: true, open: "18:00", close: "24:00" },
      1: { enabled: false, open: "18:00", close: "24:00" },
      2: { enabled: true, open: "18:00", close: "24:00" },
      3: { enabled: true, open: "18:00", close: "24:00" },
      4: { enabled: true, open: "18:00", close: "24:00" },
      5: { enabled: true, open: "14:00", close: "04:00" },
      6: { enabled: true, open: "14:00", close: "04:00" },
    },
    manualOverride: "auto",
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
    closeMin += 24 * 60;
    const nowAdj = nowMin < openMin ? nowMin + 24 * 60 : nowMin;
    return nowAdj >= openMin && nowAdj < closeMin;
  }
  return nowMin >= openMin && nowMin < closeMin;
}

function useClockTick(intervalMs = 30000) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
}

function getPrepTimeLabel(settings) {
  if (!settings?.prepTime) return null;
  const day = new Date().getDay();
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

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, writeBatch } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig.js";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

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
    return { ok: true };
  } catch (e) {
    console.error("storage write error", e);
    return { ok: false, detail: (e && (e.code || e.message)) || String(e) };
  }
}
async function loadCategoryImages() {
  try {
    const snap = await getDocs(collection(db, "category-images"));
    const map = {};
    snap.forEach((d) => { map[d.data().name] = d.data().image; });
    return map;
  } catch (e) {
    console.error("category-images read error", e);
    return {};
  }
}
async function saveCategoryImage(name, image) {
  try {
    const slug = encodeURIComponent(name);
    await setDoc(doc(db, "category-images", slug), { name, image });
    return { ok: true };
  } catch (e) {
    console.error("category-images write error", e);
    return { ok: false, detail: (e && (e.code || e.message)) || String(e) };
  }
}
async function loadProducts() {
  try {
    const snap = await getDocs(collection(db, "products"));
    if (snap.empty) return null;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error("products read error", e);
    return null;
  }
}
async function saveProductsDiff(changed, removedIds) {
  try {
    if ((!changed || changed.length === 0) && (!removedIds || removedIds.length === 0)) {
      return { ok: true };
    }
    const batch = writeBatch(db);
    (changed || []).forEach((p) => {
      const { id, ...data } = p;
      batch.set(doc(db, "products", id), data);
    });
    (removedIds || []).forEach((id) => {
      batch.delete(doc(db, "products", id));
    });
    await batch.commit();
    return { ok: true };
  } catch (e) {
    console.error("products write error", e);
    return { ok: false, detail: (e && (e.code || e.message)) || String(e) };
  }
}

// ---------- Pedidos: um documento por pedido ----------
async function checkIsFirstOrder(key) {
  if (!key) return false;
  try {
    const snap = await getDoc(doc(db, "customers", key));
    return !snap.exists();
  } catch (e) {
    console.error("customers read error", e);
    return false; // na dúvida, cobra a taxa de entrega
  }
}

async function createOrderDocs(order, markFirst) {
  const key = phoneKey(order.phone);
  const clean = JSON.parse(JSON.stringify(order)); // Firestore não aceita valores undefined
  try {
    await setDoc(doc(db, "orders", clean.id), clean);
  } catch (e) {
    console.error("order write error", e);
    return { ok: false, detail: (e && (e.code || e.message)) || String(e) };
  }
  if (key) {
    try {
      await setDoc(doc(db, "tracking", key, "orders", clean.id), {
        id: clean.id, createdAt: clean.createdAt, total: clean.total, status: clean.status, notes: clean.notes || "",
      });
    } catch (e) { console.error("tracking write error", e); }
    if (markFirst) {
      try { await setDoc(doc(db, "customers", key), { firstOrderAt: clean.createdAt }); } catch (e) { console.error("customers write error", e); }
    }
  }
  return { ok: true };
}

async function loadAllOrders() {
  try {
    const snap = await getDocs(collection(db, "orders"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    return list;
  } catch (e) {
    console.error("orders read error", e);
    return null; // null = falhou (não confundir com "nenhum pedido")
  }
}

async function loadTrackingByPhone(key) {
  if (!key) return [];
  try {
    const snap = await getDocs(collection(db, "tracking", key, "orders"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    return list;
  } catch (e) {
    console.error("tracking read error", e);
    return null;
  }
}

async function updateOrderDocs(order, patch) {
  try {
    await updateDoc(doc(db, "orders", order.id), patch);
  } catch (e) {
    console.error("order update error", e);
    return { ok: false, detail: (e && (e.code || e.message)) || String(e) };
  }
  const key = phoneKey(order.phone);
  if (key && "status" in patch) {
    try { await updateDoc(doc(db, "tracking", key, "orders", order.id), { status: patch.status }); } catch (e) { console.error("tracking update error", e); }
  }
  return { ok: true };
}

async function deleteOrderDocs(order) {
  try {
    await deleteDoc(doc(db, "orders", order.id));
  } catch (e) {
    console.error("order delete error", e);
    return { ok: false, detail: (e && (e.code || e.message)) || String(e) };
  }
  const key = phoneKey(order.phone);
  if (key) {
    try { await deleteDoc(doc(db, "tracking", key, "orders", order.id)); } catch (e) { console.error("tracking delete error", e); }
  }
  return { ok: true };
}

// Traz os pedidos antigos (que ficavam todos num documento só, legível por qualquer um)
// para o formato novo, e esvazia o documento antigo. Só roda quando o admin está logado.
async function migrateLegacyOrders() {
  try {
    const snap = await getDoc(doc(db, "store", "orders"));
    const legacy = snap.exists() ? snap.data().value : [];
    if (!Array.isArray(legacy) || legacy.length === 0) return;
    const valid = legacy.filter((o) => o && o.id);
    for (let i = 0; i < valid.length; i += 100) {
      const batch = writeBatch(db);
      valid.slice(i, i + 100).forEach((o) => {
        const clean = JSON.parse(JSON.stringify(o));
        batch.set(doc(db, "orders", clean.id), clean);
        const k = phoneKey(clean.phone);
        if (k) {
          batch.set(doc(db, "tracking", k, "orders", clean.id), {
            id: clean.id, createdAt: clean.createdAt || "", total: clean.total || 0, status: clean.status || "recebido", notes: clean.notes || "",
          });
          batch.set(doc(db, "customers", k), { firstOrderAt: clean.createdAt || "" });
        }
      });
      await batch.commit();
    }
    await setDoc(doc(db, "store", "orders"), { value: [] });
  } catch (e) {
    console.error("migração dos pedidos antigos falhou", e);
  }
}

function seedProducts() {
  const mk = (name, subcategory, group, price, opts = {}) => ({
    id: uid("p"), name, subcategory, group, price,
    description: opts.description || "", ingredients: opts.ingredients || "",
    active: true, featured: !!opts.featured, image: opts.image || DEFAULT_IMAGE,
    sold: 0, soldMonth: currentMonthKey(),
  });
  return [
    mk("X Salada", "Lanches Tradicionais", "Salgados", 12.99, { description: "Pão com gergelim, hambúrguer 56g, queijo cheddar, alface, tomate, cebola e molho da casa." }),
    mk("X Bacon", "Lanches Tradicionais", "Salgados", 14.99, { description: "Pão com gergelim, hambúrguer 56g, bacon crocante, queijo cheddar, alface, tomate e molho da casa." }),
  ];
}

// ================= MAIN APP =================
export default function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [orders, setOrders] = useState([]);
  const [adminAuth, setAdminAuth] = useState(null);
  const [categoryConfig, setCategoryConfig] = useState(null);
  const [categoryImages, setCategoryImages] = useState({});

  const isAdminLink = typeof window !== "undefined" && /admin/i.test(window.location.hash || "");
  const [view, setView] = useState(isAdminLink ? "admin" : "store");
  const [activeCategory, setActiveCategory] = useState("Lançamentos");
  const [cart, setCart] = useState([]);
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
  const [saveError, setSaveError] = useState(null);
  const [justSaved, setJustSaved] = useState(false);
  const flashSaved = useCallback(() => {
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }, []);

  const productsRef = useRef([]);

  useEffect(() => {
    (async () => {
      let p = await loadProducts();
      if (!p) {
        p = seedProducts();
        await saveProductsDiff(p, []);
      }
      productsRef.current = p;
      let s = await loadKey("settings", null);
      if (!s) {
        s = seedSettings();
        await saveKey("settings", s);
      }
      let cc = await loadKey("category-config", null);
      if (!cc) {
        cc = { flat: FLAT_CATEGORIES, subcats: SUBCATS };
        await saveKey("category-config", cc);
      }
      let ci = await loadCategoryImages();

      setCategoryConfig(cc);
      setProducts(p);
      setSettings(s);
      setCategoryImages(ci);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, []);

  const persistProducts = useCallback(async (next) => {
    const prev = productsRef.current || [];
    setProducts(next);
    const prevById = new Map(prev.map((p) => [p.id, p]));
    const changed = next.filter((p) => {
      const old = prevById.get(p.id);
      return !old || JSON.stringify(old) !== JSON.stringify(p);
    });
    const nextIds = new Set(next.map((p) => p.id));
    const removedIds = prev.filter((p) => !nextIds.has(p.id)).map((p) => p.id);
    const r = await saveProductsDiff(changed, removedIds);
    if (!r.ok) {
      setSaveError("Não consegui salvar o produto. Detalhe técnico: " + r.detail);
    } else {
      productsRef.current = next;
      setSaveError(null);
      flashSaved();
    }
  }, []);
  const persistSettings = useCallback(async (next) => {
    setSettings(next);
    const r = await saveKey("settings", next);
    if (!r.ok) { setSaveError("Não consegui salvar as configurações. Detalhe técnico: " + r.detail); } else { setSaveError(null); flashSaved(); }
  }, []);
  const addCategory = useCallback(async (group, name) => {
    setCategoryConfig((prev) => {
      const base = prev || { flat: FLAT_CATEGORIES, subcats: SUBCATS };
      if (base.flat.includes(name)) return base;
      const next = {
        flat: [...base.flat, name],
        subcats: { ...base.subcats, [group]: [...(base.subcats[group] || []), name] },
      };
      saveKey("category-config", next).then((r) => {
        if (!r.ok) { setSaveError("Não consegui salvar a nova categoria. Detalhe técnico: " + r.detail); } else { setSaveError(null); flashSaved(); }
      });
      return next;
    });
  }, []);
  const persistCategoryConfig = useCallback(async (next) => {
    setCategoryConfig(next);
    const r = await saveKey("category-config", next);
    if (!r.ok) { setSaveError("Não consegui salvar a nova ordem das categorias. Detalhe técnico: " + r.detail); } else { setSaveError(null); flashSaved(); }
  }, []);
  const persistCategoryImage = useCallback(async (name, image) => {
    setCategoryImages((prev) => ({ ...prev, [name]: image }));
    const r = await saveCategoryImage(name, image);
    if (!r.ok) { setSaveError("Não consegui salvar a foto da categoria. Detalhe técnico: " + r.detail); } else { setSaveError(null); flashSaved(); }
  }, []);
  const refreshOrders = useCallback(async () => {
    const fresh = await loadAllOrders();
    if (fresh) setOrders(fresh);
    return fresh; // null se a leitura falhou
  }, []);
  const updateOrder = useCallback(async (order, patch) => {
    setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, ...patch } : o)));
    const r = await updateOrderDocs(order, patch);
    if (!r.ok) { setSaveError("Não consegui atualizar o pedido. Detalhe técnico: " + r.detail); } else { setSaveError(null); flashSaved(); }
  }, []);
  const deleteOrder = useCallback(async (order) => {
    setOrders((prev) => prev.filter((o) => o.id !== order.id));
    const r = await deleteOrderDocs(order);
    if (!r.ok) { setSaveError("Não consegui excluir o pedido. Detalhe técnico: " + r.detail); } else { setSaveError(null); flashSaved(); }
  }, []);

  // os pedidos só são carregados quando o admin entra (clientes não leem a lista de pedidos)
  useEffect(() => {
    if (!isAdmin) return;
    let cancelled = false;
    (async () => {
      await migrateLegacyOrders();
      const r = await loadAllOrders();
      if (!cancelled && r) setOrders(r);
    })();
    return () => { cancelled = true; };
  }, [isAdmin]);
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
      prev.map((c) => (c.productId === productId ? { ...c, qty: c.qty + delta } : c)).filter((c) => c.qty > 0)
    );
  }
  function removeFromCart(productId) {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
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
            `🏠 ${order.address}, ${order.neighborhood}${order.reference ? `\n📍 Referência: ${order.reference}` : ""}`,
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
      order.notes ? `📝 *Observações:* ${order.notes}` : null,
      order.notes ? `` : null,
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

  async function finalizeOrder(orderDraft, waWindow) {
    const now = new Date();
    const isFirst = await checkIsFirstOrder(phoneKey(orderDraft.phone));
    const freeDelivery = isFirst && orderDraft.deliveryMethod === "entrega";
    const pixDiscount = orderDraft.paymentMethod === "pix" ? Math.round(orderDraft.subtotal * 0.05 * 100) / 100 : 0;
    const deliveryFee = freeDelivery ? 0 : orderDraft.deliveryFee;
    const total = Math.round((orderDraft.subtotal - pixDiscount + deliveryFee) * 100) / 100;

    const changeAmount =
      orderDraft.paymentMethod === "dinheiro" && orderDraft.changeFor != null
        ? Math.round((orderDraft.changeFor - total) * 100) / 100
        : null;

    const order = {
      id: uid("ord"), ...orderDraft, deliveryFee, freeDelivery, pixDiscount, changeAmount, total,
      createdAt: now.toISOString(), status: "recebido", paid: false,
    };

    const res = await createOrderDocs(order, freeDelivery);
    setSyncIssue(!res.ok);

    setLastOrder(order);
    setCart([]);

    const text = encodeURIComponent(buildWhatsAppMessage(order));
    const url = `https://wa.me/${settings.whatsapp}?text=${text}`;
    if (waWindow && !waWindow.closed) {
      waWindow.location.href = url;
    } else {
      window.open(url, "_blank");
    }

    setView("confirmation");
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

  if (view === "admin") {
    return (
      <div className="min-h-screen" style={{ background: C.cream, fontFamily: "system-ui, sans-serif" }}>
        <AdminGate
          isAdmin={isAdmin} setIsAdmin={setIsAdmin} adminAuth={adminAuth} persistAuth={persistAuth}
          products={products} persistProducts={persistProducts} settings={settings} persistSettings={persistSettings}
          orders={orders} updateOrder={updateOrder} deleteOrder={deleteOrder} refreshOrders={refreshOrders} setView={setView}
          categoryConfig={categoryConfig} addCategory={addCategory} persistCategoryConfig={persistCategoryConfig}
          categoryImages={categoryImages} persistCategoryImage={persistCategoryImage}
          saveError={saveError} setSaveError={setSaveError} justSaved={justSaved}
        />
        <SiteFooter setView={setView} />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: C.cream, fontFamily: "system-ui, sans-serif" }}>
      <TopBar settings={settings} view={view} setView={setView} cartCount={cartCount} />

      {view === "store" && (
        <StoreView products={products} settings={settings} activeCategory={activeCategory} setActiveCategory={setActiveCategory} addToCart={addToCart} setView={setView} categoryConfig={categoryConfig} />
      )}
      {view === "cart" && (
        <CartView cartItems={cartItems} changeQty={changeQty} removeFromCart={removeFromCart} subtotal={cartSubtotal} setView={setView} />
      )}
      {view === "checkout" && (
        <CheckoutView cartItems={cartItems} subtotal={cartSubtotal} settings={settings} orders={orders} setView={setView} finalizeOrder={finalizeOrder} />
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
      <SiteFooter setView={setView} />
    </div>
  );
}

// Rodapé com o link/botão do Admin sempre visível no canto inferior esquerdo —
// funciona igual em celular e notebook (é um botão de verdade, não depende de gesto de toque).
function SiteFooter({ setView }) {
  return (
    <footer
      className="flex items-center justify-between px-4 py-4 text-xs"
      style={{ color: C.gray, borderTop: `1px solid ${C.line}` }}
    >
      <button
        onClick={() => setView("admin")}
        className="font-bold px-3 py-1.5 rounded-full"
        style={{ border: `1px solid ${C.line}`, color: C.gray }}
      >
        Admin
      </button>
      <span className="flex-1 text-center">Desenvolvido por Faby Bassitti</span>
      <span style={{ width: 62 }} />
    </footer>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full font-bold text-sm shadow-lg" style={{ background: C.ink, color: "#fff" }}>
      {message}
    </div>
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

function TopBar({ settings, view, setView, cartCount }) {
  useClockTick();
  const open = isStoreOpenNow(settings);
  return (
    <div className="sticky top-0 z-40" style={{ background: "#fff", borderBottom: `3px solid ${C.red}` }}>
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <button onClick={() => setView("store")} className="flex items-center gap-2 font-extrabold text-lg" style={{ color: C.ink }}>
          <img src={DEFAULT_IMAGE} alt="Logo" className="rounded-full" style={{ width: 42, height: 42, border: `2px solid ${C.red}` }} />
          O COZINHEIRO <span style={{ color: C.red }}>DE OURO</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full" style={{ background: open ? "#E8F8EE" : "#FBE9E9", color: open ? "#1E8E4A" : C.redDeep }}>
            <Circle size={8} fill={open ? "#1E8E4A" : C.redDeep} stroke="none" />
            {open ? "Aberto agora" : "Fechado no momento"}
          </span>
          <button onClick={() => setView("track")} className="text-xs font-bold px-3 py-2 rounded-full" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
            Meu pedido
          </button>
          <button onClick={() => setView("cart")} className="relative p-2 rounded-full" style={{ background: C.red, color: "#fff" }}>
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center" style={{ background: C.gold, color: C.ink }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function StoreView({ products, settings, activeCategory, setActiveCategory, addToCart, setView, categoryConfig }) {
  const FLAT = categoryConfig?.flat || FLAT_CATEGORIES;
  useClockTick();
  const open = isStoreOpenNow(settings);

  const items = useMemo(() => {
    const filtered = products.filter((p) => {
      if (!p.active) return false;
      if (activeCategory === "Lançamentos") return !!p.featured;
      return p.subcategory === activeCategory;
    });
    if (activeCategory === "Lançamentos") {
      return [...filtered].sort((a, b) => {
        const ai = FLAT.indexOf(a.subcategory);
        const bi = FLAT.indexOf(b.subcategory);
        if (ai !== bi) return ai - bi;
        return a.name.localeCompare(b.name, "pt-BR");
      });
    }
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }, [products, activeCategory, FLAT]);

  return (
    <div className="max-w-3xl mx-auto px-4 pb-24">
      <div className="text-center py-8">
        <img src={DEFAULT_IMAGE} alt="Logo" className="mx-auto mb-3 rounded-full" style={{ width: 84, height: 84, border: `3px solid ${C.red}` }} />
        <h1 className="text-2xl font-extrabold" style={{ color: C.ink }}>Olá! Que alegria ter você aqui 🍔💛</h1>
        <p className="mt-2 text-sm" style={{ color: C.gray }}>
          Seja muito bem-vindo ao nosso cardápio! Prepare-se para experimentar aquele lanche feito com carinho, na medida certa pra você. Obrigado por escolher a gente — vamos cuidar do seu pedido do início ao fim.
        </p>
        {open && getPrepTimeLabel(settings) && (
          <p className="mt-2 text-xs font-bold" style={{ color: C.red }}>⏱ Tempo de preparo hoje: {getPrepTimeLabel(settings)}</p>
        )}
        <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full" style={{ background: "#E8F8EE", color: "#1E8E4A" }}>
          <MessageCircle size={16} /> {formatPhone(settings.whatsapp)}
        </a>
        {!open && (
          <div className="mt-4 inline-block px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "#FBE9E9", color: C.redDeep }}>
            Estamos fechados neste momento. Você pode navegar pelo cardápio, mas os pedidos abrem no nosso próximo horário de funcionamento.
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 sticky top-[64px] z-30" style={{ background: C.cream }}>
        {FLAT.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap"
            style={activeCategory === cat ? { background: C.red, color: "#fff" } : { background: "#fff", color: C.ink, border: `1px solid ${C.line}` }}>
            {cat}
          </button>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-center py-10" style={{ color: C.gray }}>Nenhum produto disponível nessa categoria no momento.</p>
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
    <div className="rounded-xl p-4 flex gap-3" style={{ background: "#fff", border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.red}` }}>
      <img src={product.image || DEFAULT_IMAGE} alt={product.name} className="rounded-lg object-cover flex-shrink-0" style={{ width: 64, height: 64, border: `1px solid ${C.line}` }} />
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-extrabold" style={{ color: C.ink }}>{product.name}</h3>
            <span className="font-extrabold whitespace-nowrap" style={{ color: C.red }}>{money(product.price)}</span>
          </div>
          {product.description && <p className="text-xs mt-1" style={{ color: C.gray }}>{product.description}</p>}
          {product.ingredients && <p className="text-xs mt-1 italic" style={{ color: C.gray }}>Ingredientes: {product.ingredients}</p>}
        </div>
        <button onClick={onAdd} className="mt-3 self-start flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-full" style={{ background: C.ink, color: "#fff" }}>
          <Plus size={14} /> Adicionar
        </button>
      </div>
    </div>
  );
}

function CartView({ cartItems, changeQty, removeFromCart, subtotal, setView }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <BackBtn onClick={() => setView("store")} label="Continuar comprando" />
      <h2 className="text-xl font-extrabold mb-4" style={{ color: C.ink }}>Seu carrinho</h2>
      {cartItems.length === 0 ? (
        <p style={{ color: C.gray }}>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-3">
            {cartItems.map((it) => (
              <div key={it.id} className="flex items-center justify-between gap-3 rounded-xl p-3" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
                <div>
                  <p className="font-bold" style={{ color: C.ink }}>{it.name}</p>
                  <p className="text-xs" style={{ color: C.gray }}>{money(it.price)} cada</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => changeQty(it.id, -1)} className="p-1 rounded-full" style={{ border: `1px solid ${C.line}` }}><Minus size={14} /></button>
                  <span className="font-bold w-5 text-center">{it.qty}</span>
                  <button onClick={() => changeQty(it.id, 1)} className="p-1 rounded-full" style={{ border: `1px solid ${C.line}` }}><Plus size={14} /></button>
                  <button onClick={() => removeFromCart(it.id)} className="p-1 ml-1" style={{ color: C.redDeep }}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between font-extrabold text-lg">
            <span>Subtotal</span>
            <span style={{ color: C.red }}>{money(subtotal)}</span>
          </div>
          <button onClick={() => setView("checkout")} className="mt-4 w-full py-3 rounded-full font-extrabold" style={{ background: C.red, color: "#fff" }}>
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

function CheckoutView({ cartItems, subtotal, settings, orders, setView, finalizeOrder }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("entrega");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [neighborhoodId, setNeighborhoodId] = useState(settings.neighborhoods[0]?.id || "");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [changeFor, setChangeFor] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const neighborhood = settings.neighborhoods.find((n) => n.id === neighborhoodId);
  const baseFee = deliveryMethod === "entrega" ? neighborhood?.fee || 0 : 0;

  const [isFirstOrder, setIsFirstOrder] = useState(false);
  useEffect(() => {
    const key = phoneKey(phone);
    if (key.length < 10) { setIsFirstOrder(false); return; }
    let cancelled = false;
    const t = setTimeout(async () => {
      const r = await checkIsFirstOrder(key);
      if (!cancelled) setIsFirstOrder(r);
    }, 400);
    return () => { cancelled = true; clearTimeout(t); };
  }, [phone]);
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
    const waWindow = window.open("", "_blank");
    const fullAddress =
      deliveryMethod === "entrega"
        ? `${street.trim()}, ${number.trim()}${complement.trim() ? " — " + complement.trim() : ""}`
        : "Retirada no local";
    finalizeOrder(
      {
        name: name.trim(), phone: phone.trim(), deliveryMethod,
        street: street.trim(), number: number.trim(), complement: complement.trim(),
        reference: reference.trim(), notes: notes.trim(), address: fullAddress,
        neighborhood: deliveryMethod === "entrega" ? neighborhood?.name : "-",
        deliveryFee: baseFee,
        items: cartItems.map((it) => ({ productId: it.id, name: it.name, price: it.price, qty: it.qty })),
        subtotal, paymentMethod,
        changeFor: paymentMethod === "dinheiro" && changeForNum !== null ? changeForNum : null,
      },
      waWindow
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <BackBtn onClick={() => setView("cart")} label="Voltar ao carrinho" />
      <div className="rounded-xl p-4 mb-4" style={{ background: "#FFF3D6" }}>
        <p className="text-sm font-bold" style={{ color: C.ink }}>Olá, muito obrigado! Seja muito bem-vindo ao nosso portal de compras 💛</p>
        <p className="text-xs mt-1" style={{ color: C.gray }}>Falta pouco! Preenche os dados abaixo certinho pra gente entregar seu pedido rapidinho.</p>
      </div>
      <h2 className="text-xl font-extrabold mb-4" style={{ color: C.ink }}>Dados de entrega</h2>

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
          <ChoiceBtn active={deliveryMethod === "entrega"} onClick={() => setDeliveryMethod("entrega")}>Entrega</ChoiceBtn>
          <ChoiceBtn active={deliveryMethod === "retirada"} onClick={() => setDeliveryMethod("retirada")}>Retirada no local</ChoiceBtn>
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
              <label className="text-xs font-bold" style={{ color: C.gray }}>Bairro</label>
              <select value={neighborhoodId} onChange={(e) => setNeighborhoodId(e.target.value)} className="w-full mt-1 p-3 rounded-xl" style={{ border: `1px solid ${C.line}` }}>
                {settings.neighborhoods.map((n) => (
                  <option key={n.id} value={n.id}>{n.name} — taxa {money(n.fee)}</option>
                ))}
              </select>
            </div>
            <Field label="Ponto de referência (opcional)" icon={MapPin}>
              <input value={reference} onChange={(e) => setReference(e.target.value)} className="w-full outline-none" placeholder="Ex: perto do mercado, portão azul..." />
            </Field>
          </>
        )}

        <div>
          <label className="text-xs font-bold" style={{ color: C.gray }}>Observações do pedido (opcional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full mt-1 p-3 rounded-xl outline-none"
            style={{ border: `1px solid ${C.line}` }}
            placeholder="Ex: sem cebola, ponto da carne bem passado, tirar picles..."
            rows={3}
          />
        </div>

        <div>
          <label className="text-xs font-bold" style={{ color: C.gray }}>Forma de pagamento</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {[
              { k: "pix", label: "Pix" },
              { k: "credito", label: "Cartão de Crédito" },
              { k: "debito", label: "Cartão de Débito" },
              { k: "dinheiro", label: "Dinheiro" },
            ].map((opt) => (
              <ChoiceBtn key={opt.k} active={paymentMethod === opt.k} onClick={() => setPaymentMethod(opt.k)}>{opt.label}</ChoiceBtn>
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
              <input type="number" step="0.01" min="0" value={changeFor} onChange={(e) => setChangeFor(e.target.value)}
                placeholder={`Valor exato: ${money(total)}`} className="w-full p-2 rounded-lg outline-none" style={{ border: `1px solid ${C.line}` }} />
              {changeForNum !== null && changeForNum < total && (
                <p className="font-bold" style={{ color: C.redDeep }}>O valor informado é menor que o total do pedido ({money(total)}).</p>
              )}
              {changeForNum !== null && changeForNum >= total && (
                <p className="font-bold" style={{ color: "#1E8E4A" }}>Troco a levar: {money(changeForNum - total)}</p>
              )}
            </div>
          )}
        </div>

        {error && <p className="text-xs font-bold" style={{ color: C.redDeep }}>{error}</p>}

        <div className="rounded-xl p-4 mt-2" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          {pixDiscount > 0 && (
            <div className="flex justify-between text-sm mt-1" style={{ color: "#1E8E4A" }}><span>Desconto Pix (5%)</span><span>-{money(pixDiscount)}</span></div>
          )}
          <div className="flex justify-between text-sm mt-1">
            <span>Taxa de entrega{isFirstOrder ? " (grátis no 1º pedido)" : ""}</span>
            <span>{isFirstOrder ? "R$ 0,00" : money(fee)}</span>
          </div>
          <div className="flex justify-between font-extrabold text-lg mt-2">
            <span>Total</span><span style={{ color: C.red }}>{money(total)}</span>
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
      <label className="text-xs font-bold" style={{ color: C.gray }}>{label}</label>
      <div className="flex items-center gap-2 mt-1 p-3 rounded-xl" style={{ border: `1px solid ${C.line}` }}>
        <Icon size={16} style={{ color: C.gray }} />
        {children}
      </div>
    </div>
  );
}

function ChoiceBtn({ active, onClick, children }) {
  return (
    <button onClick={onClick} className="flex-1 text-xs font-bold py-2 rounded-full" style={active ? { background: C.ink, color: "#fff" } : { border: `1px solid ${C.line}`, color: C.ink }}>
      {children}
    </button>
  );
}

function ConfirmationView({ order, settings, setView, syncIssue }) {
  const dt = new Date(order.createdAt);
  const waLink = `https://wa.me/${settings.whatsapp}`;
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <CheckCircle2 size={44} style={{ color: "#1E8E4A" }} className="mx-auto mb-2" />
        <h2 className="text-xl font-extrabold" style={{ color: C.ink }}>Muito obrigado pelo seu pedido! 💛</h2>
        <p className="text-sm" style={{ color: C.gray }}>Seja sempre muito bem-vindo — vamos preparar tudo com todo capricho pra você. Aqui está o resumo do seu pedido.</p>
        <p className="text-xs mt-2 font-bold" style={{ color: "#1E8E4A" }}>Abrimos o WhatsApp da loja com o resumo pronto — é só confirmar o envio por lá.</p>
        {syncIssue && (
          <div className="mt-3 text-xs rounded-xl p-3 text-left" style={{ background: "#FFF3D6", color: C.ink }}>
            <strong>Atenção:</strong> seu pedido foi registrado neste dispositivo, mas pode não ter sincronizado com o painel da loja. Para garantir, confirme o envio da mensagem no WhatsApp que abrimos — é por lá que o pedido chega com certeza até a loja.
          </div>
        )}
      </div>

      <div className="rounded-xl p-4 space-y-2" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
        <Row label="Cliente" value={order.name} />
        <Row label="Telefone" value={order.phone} />
        <Row label="Horário do pedido" value={dt.toLocaleString("pt-BR")} />
        <Row label="Forma de entrega" value={order.deliveryMethod === "entrega" ? `Entrega — ${order.address} (${order.neighborhood})${order.reference ? " · Ref: " + order.reference : ""}` : "Retirada no local"} />
        <Row label="Forma de pagamento" value={paymentLabel(order.paymentMethod)} />
        {order.notes && <Row label="Observações" value={order.notes} />}
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
          <span>Total</span><span style={{ color: C.red }}>{money(order.total)}</span>
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
          <p>Faça o Pix para a chave <strong>{settings.pixKey}</strong> no valor de <strong>{money(order.total)}</strong> e envie o comprovante pelo WhatsApp da loja para darmos sequência ao seu pedido.</p>
          <a href={waLink} target="_blank" rel="noopener" className="inline-block mt-3 px-4 py-2 rounded-full font-bold text-white" style={{ background: C.green }}>
            Enviar comprovante no WhatsApp
          </a>
        </div>
      )}

      <div className="flex gap-2 mt-6">
        <button onClick={() => setView("track")} className="flex-1 py-3 rounded-full font-extrabold" style={{ background: C.ink, color: "#fff" }}>Acompanhar meu pedido</button>
        <button onClick={() => setView("store")} className="flex-1 py-3 rounded-full font-extrabold" style={{ border: `1px solid ${C.line}`, color: C.ink }}>Voltar ao cardápio</button>
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

function TrackView({ setView }) {
  const [phone, setPhone] = useState("");
  const [results, setResults] = useState(null);
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);

  async function search(silent) {
    const key = phoneKey(phone);
    if (key.length < 10) { setResults([]); setFailed(false); return; }
    if (!silent) setBusy(true);
    const r = await loadTrackingByPhone(key);
    if (r === null) { setFailed(true); } else { setFailed(false); setResults(r); }
    setBusy(false);
  }

  const hasSearched = results !== null;
  useEffect(() => {
    if (!hasSearched) return;
    const id = setInterval(() => search(true), 15000);
    return () => clearInterval(id);
  }, [hasSearched, phone]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <BackBtn onClick={() => setView("store")} label="Voltar ao cardápio" />
      <h2 className="text-xl font-extrabold mb-4" style={{ color: C.ink }}>Acompanhar pedido</h2>
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 p-3 rounded-xl" style={{ border: `1px solid ${C.line}` }}>
          <Phone size={16} style={{ color: C.gray }} />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") search(false); }}
            placeholder="Digite seu celular"
            inputMode="tel"
            className="w-full outline-none"
          />
        </div>
        <button onClick={() => search(false)} className="px-4 rounded-xl font-bold" style={{ background: C.red, color: "#fff" }}><Search size={18} /></button>
      </div>
      {busy && <p className="mt-6 text-sm" style={{ color: C.gray }}>Buscando...</p>}
      {failed && (
        <p className="mt-6 text-sm font-bold" style={{ color: C.redDeep }}>Não consegui buscar agora. Verifique sua conexão e tente de novo.</p>
      )}
      {hasSearched && !failed && !busy && results.length === 0 && (
        <p className="mt-6 text-sm" style={{ color: C.gray }}>Não encontramos pedidos com esse número.</p>
      )}
      <div className="mt-6 space-y-6">
        {(results || []).map((o) => (
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
      {order.notes && <p className="text-xs italic mb-2" style={{ color: C.gray }}>Obs: {order.notes}</p>}
      <div className="flex items-center justify-between">
        {STATUS_STEPS.map((s, i) => {
          const Icon = s.icon;
          const done = i <= activeIdx;
          return (
            <div key={s.key} className="flex-1 flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-1" style={{ background: done ? C.red : "#F0EEE8", color: done ? "#fff" : C.gray }}>
                <Icon size={16} />
              </div>
              <span className="text-[10px] leading-tight" style={{ color: done ? C.ink : C.gray }}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AdminGate({ isAdmin, setIsAdmin, ...rest }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (isAdmin) {
    return <AdminPanel onLogout={() => signOut(auth)} {...rest} />;
  }

  async function handleLogin() {
    setError("");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
    } catch (e) {
      const code = (e && e.code) || "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found" || code === "auth/invalid-email") {
        setError("E-mail ou senha incorretos.");
      } else if (code === "auth/network-request-failed") {
        setError("Sem conexão com a internet. Tente de novo.");
      } else if (code === "auth/too-many-requests") {
        setError("Muitas tentativas. Aguarde alguns minutos e tente de novo.");
      } else {
        setError("Não consegui entrar (" + (code || "erro desconhecido") + ").");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <div className="text-center mb-6">
        <Settings size={32} style={{ color: C.red }} className="mx-auto mb-2" />
        <h2 className="text-lg font-extrabold" style={{ color: C.ink }}>Login administrativo</h2>
      </div>
      <div className="space-y-3">
        <Field label="E-mail" icon={User}>
          <input type="email" inputMode="email" autoCapitalize="none" autoCorrect="off" autoComplete="username" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full outline-none" placeholder="seuemail@exemplo.com" />
        </Field>
        <Field label="Senha" icon={showPw ? EyeOff : Eye}>
          <input type={showPw ? "text" : "password"} autoCapitalize="none" autoCorrect="off" autoComplete="current-password" spellCheck={false} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }} className="w-full outline-none" placeholder="Senha" />
          <button onClick={() => setShowPw((v) => !v)} className="text-xs" style={{ color: C.gray }}>{showPw ? "ocultar" : "ver"}</button>
        </Field>
        {error && <p className="text-xs font-bold" style={{ color: C.redDeep }}>{error}</p>}
        <button onClick={handleLogin} disabled={busy} className="w-full py-3 rounded-full font-extrabold" style={{ background: C.red, color: "#fff", opacity: busy ? 0.7 : 1 }}>
          {busy ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  );
}

function AdminPanel({ onLogout, products, persistProducts, settings, persistSettings, orders, updateOrder, deleteOrder, refreshOrders, setView, categoryConfig, addCategory, persistCategoryConfig, categoryImages, persistCategoryImage, saveError, setSaveError, justSaved }) {
  const [tab, setTab] = useState("dashboard");
  const [newOrderAlert, setNewOrderAlert] = useState(false);
  const knownCountRef = useRef(orders.length);
  const audioCtxRef = useRef(null);

  useEffect(() => { knownCountRef.current = orders.length; }, [orders.length]);

  useEffect(() => {
    function unlockAudio() {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        if (!audioCtxRef.current) audioCtxRef.current = new Ctx();
        if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
      } catch (e) {}
    }
    document.addEventListener("click", unlockAudio, { once: true });
    document.addEventListener("touchstart", unlockAudio, { once: true });
    return () => {
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  function playAlertSound() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = audioCtxRef.current || new Ctx();
      audioCtxRef.current = ctx;
      const fire = () => {
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
      };
      if (ctx.state === "suspended") { ctx.resume().then(fire).catch(fire); } else { fire(); }
    } catch (e) {
      console.error("audio alert error", e);
    }
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const fresh = await refreshOrders();
      if (!fresh) return;
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
    { k: "categories", label: "Categorias", icon: ListOrdered },
    { k: "neighborhoods", label: "Bairros/Taxas", icon: MapPin },
    { k: "hours", label: "Horários", icon: Clock },
    { k: "print", label: "Imprimir cardápio", icon: ChefHat },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {saveError && (
        <div className="mb-4 p-3 rounded-xl text-sm font-bold flex items-start justify-between gap-2" style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b" }}>
          <span>⚠️ {saveError}</span>
          <button onClick={() => setSaveError(null)} className="shrink-0 font-extrabold px-2">✕</button>
        </div>
      )}
      {justSaved && !saveError && (
        <div className="mb-4 p-3 rounded-xl text-sm font-bold" style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#166534" }}>✅ Salvo com sucesso!</div>
      )}
      {newOrderAlert && (
        <button onClick={() => { setTab("orders"); setNewOrderAlert(false); }} className="w-full mb-4 flex items-center justify-center gap-2 text-sm font-extrabold py-3 rounded-xl animate-pulse" style={{ background: "#1E8E4A", color: "#fff" }}>
          🔔 Novo pedido recebido! Toque para ver
        </button>
      )}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold" style={{ color: C.ink }}>Painel administrativo</h2>
        <div className="flex gap-2">
          <button onClick={() => setView("store")} className="text-xs font-bold px-3 py-2 rounded-full" style={{ border: `1px solid ${C.line}` }}>Ver loja</button>
          <button onClick={onLogout} className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-full" style={{ background: C.ink, color: "#fff" }}><LogOut size={14} /> Sair</button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto mb-6">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.k} onClick={() => { setTab(t.k); if (t.k === "orders") setNewOrderAlert(false); }}
              className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap"
              style={tab === t.k ? { background: C.red, color: "#fff" } : { border: `1px solid ${C.line}`, color: C.ink }}>
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "dashboard" && <AdminDashboard products={products} orders={orders} />}
      {tab === "orders" && <AdminOrders orders={orders} updateOrder={updateOrder} deleteOrder={deleteOrder} />}
      {tab === "products" && <AdminProducts products={products} persistProducts={persistProducts} categoryConfig={categoryConfig} addCategory={addCategory} />}
      {tab === "categories" && <AdminCategories categoryConfig={categoryConfig} persistCategoryConfig={persistCategoryConfig} products={products} persistProducts={persistProducts} categoryImages={categoryImages} persistCategoryImage={persistCategoryImage} />}
      {tab === "neighborhoods" && <AdminNeighborhoods settings={settings} persistSettings={persistSettings} />}
      {tab === "hours" && <AdminHours settings={settings} persistSettings={persistSettings} />}
      {tab === "print" && <AdminPrintMenu products={products} settings={settings} persistSettings={persistSettings} categoryConfig={categoryConfig} categoryImages={categoryImages} />}
    </div>
  );
}

function AdminDashboard({ products, orders }) {
  const mKey = currentMonthKey();
  const monthOrders = orders.filter((o) => (o.createdAt || "").slice(0, 7) === mKey);
  const revenue = monthOrders.reduce((s, o) => s + (o.total || 0), 0);
  const counts = {};
  monthOrders.forEach((o) => (o.items || []).forEach((it) => { counts[it.name] = (counts[it.name] || 0) + (it.qty || 0); }));
  const best = Object.entries(counts).map(([name, sold]) => ({ id: name, name, sold })).sort((a, b) => b.sold - a.sold).slice(0, 10);
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

function AdminOrders({ orders, updateOrder, deleteOrder }) {
  return (
    <div className="space-y-3">
      {orders.length === 0 && <p className="text-sm" style={{ color: C.gray }}>Nenhum pedido ainda.</p>}
      {orders.map((o) => (
        <div key={o.id} className="rounded-xl p-4" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
          <div className="flex justify-between text-sm flex-wrap gap-2">
            <div>
              <p className="font-extrabold">{o.name} · {o.phone}</p>
              <p className="text-xs" style={{ color: C.gray }}>{new Date(o.createdAt).toLocaleString("pt-BR")}</p>
              <p className="text-xs mt-1">{(o.items || []).map((it) => `${it.qty}x ${it.name}`).join(", ")}</p>
              {o.notes && <p className="text-xs mt-1 italic" style={{ color: C.red }}>Obs: {o.notes}</p>}
              <p className="text-xs mt-1" style={{ color: C.gray }}>
                {o.deliveryMethod === "entrega" ? `Entrega: ${o.address} (${o.neighborhood})${o.reference ? " · Ref: " + o.reference : ""}` : "Retirada no local"} · {paymentLabel(o.paymentMethod)}
                {o.paymentMethod === "dinheiro" && o.changeFor != null && (<> · troco p/ {money(o.changeFor)} (levar {money(o.changeAmount)})</>)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-extrabold" style={{ color: C.red }}>{money(o.total)}</p>
              <label className="flex items-center gap-1 text-xs mt-1 justify-end">
                <input type="checkbox" checked={!!o.paid} onChange={(e) => updateOrder(o, { paid: e.target.checked })} /> Pago
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <select value={o.status} onChange={(e) => updateOrder(o, { status: e.target.value })} className="text-xs font-bold p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }}>
              {STATUS_STEPS.map((st) => (<option key={st.key} value={st.key}>{st.label}</option>))}
            </select>
            <button onClick={() => { if (confirm("Excluir este pedido definitivamente?")) deleteOrder(o); }} className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg" style={{ color: C.redDeep, border: `1px solid ${C.line}` }}>
              <Trash2 size={13} /> Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function BulkEditTool({ products, persistProducts, FLAT }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Todas");
  const [field, setField] = useState("description");
  const [search, setSearch] = useState("");
  const [replace, setReplace] = useState("");

  const matches = useMemo(() => {
    if (!search.trim()) return [];
    const re = new RegExp(escapeRegExp(search), "gi");
    return products.filter((p) => category === "Todas" || p.subcategory === category)
      .map((p) => {
        const text = p[field] || "";
        if (!re.test(text)) return null;
        re.lastIndex = 0;
        const newText = text.replace(re, replace);
        return newText === text ? null : { id: p.id, name: p.name, oldText: text, newText };
      }).filter(Boolean);
  }, [products, category, field, search, replace]);

  function apply() {
    if (matches.length === 0) return;
    const byId = new Map(matches.map((m) => [m.id, m.newText]));
    const next = products.map((p) => (byId.has(p.id) ? { ...p, [field]: byId.get(p.id) } : p));
    persistProducts(next);
    setSearch("");
    setReplace("");
  }

  return (
    <div className="rounded-xl p-3" style={{ background: C.cream, border: `1px solid ${C.line}` }}>
      <button onClick={() => setOpen((v) => !v)} className="text-sm font-bold" style={{ color: C.ink }}>{open ? "▾" : "▸"} Buscar e substituir em massa</button>
      {open && (
        <div className="mt-3 space-y-2">
          <p className="text-xs" style={{ color: C.gray }}>Troca um texto por outro em vários produtos de uma vez só.</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold" style={{ color: C.ink }}>Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full text-sm rounded-lg p-2" style={{ border: `1px solid ${C.line}` }}>
                <option value="Todas">Todas as categorias</option>
                {FLAT.filter((c) => c !== "Lançamentos").map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold" style={{ color: C.ink }}>Campo</label>
              <select value={field} onChange={(e) => setField(e.target.value)} className="w-full text-sm rounded-lg p-2" style={{ border: `1px solid ${C.line}` }}>
                <option value="description">Descrição</option>
                <option value="name">Nome</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold" style={{ color: C.ink }}>Buscar por</label>
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full text-sm rounded-lg p-2" style={{ border: `1px solid ${C.line}` }} />
          </div>
          <div>
            <label className="text-xs font-bold" style={{ color: C.ink }}>Substituir por</label>
            <input value={replace} onChange={(e) => setReplace(e.target.value)} className="w-full text-sm rounded-lg p-2" style={{ border: `1px solid ${C.line}` }} />
          </div>
          {search.trim() && (
            <div className="text-xs" style={{ color: C.gray }}>
              {matches.length === 0 ? <p>Nenhum item encontrado com esse texto.</p> : (
                <>
                  <p className="font-bold mb-1" style={{ color: C.ink }}>{matches.length} item(ns) serão alterados:</p>
                  <ul className="space-y-1 max-h-40 overflow-y-auto">
                    {matches.map((m) => (<li key={m.id}><span className="font-bold">{m.name}</span>: "{m.oldText}" → "{m.newText}"</li>))}
                  </ul>
                </>
              )}
            </div>
          )}
          <button onClick={() => { if (matches.length > 0 && confirm(`Aplicar essa troca em ${matches.length} item(ns)?`)) apply(); }}
            disabled={matches.length === 0} className="text-xs font-bold px-3 py-2 rounded-full disabled:opacity-40" style={{ background: C.red, color: "#fff" }}>
            Aplicar em {matches.length} item(ns)
          </button>
        </div>
      )}
    </div>
  );
}

function AdminProducts({ products, persistProducts, categoryConfig, addCategory }) {
  const [editingId, setEditingId] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const FLAT = categoryConfig?.flat || FLAT_CATEGORIES;

  function updateProduct(id, patch) { persistProducts(products.map((p) => (p.id === id ? { ...p, ...patch } : p))); }
  function deleteProduct(id) { if (confirm("Excluir este produto?")) { persistProducts(products.filter((p) => p.id !== id)); } }
  function addProduct(data) { persistProducts([...products, { id: uid("p"), sold: 0, soldMonth: currentMonthKey(), active: true, featured: false, ...data }]); setShowNew(false); }
  function duplicateProduct(p) { const copy = { ...p, id: uid("p"), name: p.name + " (cópia)", sold: 0, soldMonth: currentMonthKey() }; persistProducts([...products, copy]); }

  const grouped = FLAT.filter((c) => c !== "Lançamentos").map((cat) => ({ group: cat, items: products.filter((p) => p.subcategory === cat) })).filter((g) => g.items.length > 0);

  return (
    <div className="space-y-6">
      <button onClick={() => setShowNew((v) => !v)} className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-full" style={{ background: C.red, color: "#fff" }}>
        <Plus size={14} /> Novo produto
      </button>
      <BulkEditTool products={products} persistProducts={persistProducts} FLAT={FLAT} />
      {showNew && <ProductForm onSave={addProduct} onCancel={() => setShowNew(false)} categoryConfig={categoryConfig} addCategory={addCategory} />}
      {grouped.map(({ group, items }) => (
        <div key={group}>
          <h3 className="font-extrabold mb-2" style={{ color: C.ink }}>{group}</h3>
          <div className="space-y-2">
            {items.map((p) =>
              editingId === p.id ? (
                <ProductForm key={p.id} initial={p} onSave={(data) => { updateProduct(p.id, data); setEditingId(null); }} onCancel={() => setEditingId(null)} categoryConfig={categoryConfig} addCategory={addCategory} />
              ) : (
                <div key={p.id} className="flex items-center justify-between gap-3 rounded-xl p-3 flex-wrap" style={{ background: "#fff", border: `1px solid ${C.line}`, opacity: p.active ? 1 : 0.5 }}>
                  <div className="flex items-center gap-3">
                    <img src={p.image || DEFAULT_IMAGE} alt="" className="rounded-lg object-cover" style={{ width: 44, height: 44, border: `1px solid ${C.line}` }} />
                    <div>
                      <p className="font-bold text-sm">{p.name} <span style={{ color: C.gray, fontWeight: 400 }}>({p.subcategory})</span></p>
                      <p className="text-xs" style={{ color: C.gray }}>{money(p.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <label className="flex items-center gap-1 text-xs">
                      <input type="checkbox" checked={!!p.featured} onChange={(e) => updateProduct(p.id, { featured: e.target.checked })} /> Destacar em Lançamentos
                    </label>
                    <button onClick={() => updateProduct(p.id, { active: !p.active })} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: p.active ? "#1E8E4A" : "#B0392E", color: "#fff" }}>
                      {p.active ? <Power size={12} /> : <PowerOff size={12} />} {p.active ? "Ativo" : "Pausado"}
                    </button>
                    <button onClick={() => setEditingId(p.id)} className="p-1" style={{ color: C.ink }}><Pencil size={14} /></button>
                    <button onClick={() => duplicateProduct(p)} className="p-1" style={{ color: C.ink }}><Copy size={14} /></button>
                    <button onClick={() => { if (confirm(`Excluir "${p.name}" definitivamente?`)) deleteProduct(p.id); }} className="p-1" style={{ color: C.redDeep }}><Trash2 size={14} /></button>
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

function AdminCategories({ categoryConfig, persistCategoryConfig, products, persistProducts, categoryImages, persistCategoryImage }) {
  const FLAT = categoryConfig?.flat || FLAT_CATEGORIES;
  const SUB = categoryConfig?.subcats || SUBCATS;
  const [editingCat, setEditingCat] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [uploadingCat, setUploadingCat] = useState(null);
  const fileInputs = useRef({});

  function move(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= FLAT.length) return;
    const next = [...FLAT];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    persistCategoryConfig({ ...categoryConfig, flat: next });
  }

  function renameConfig(oldName, newName) {
    const nextFlat = FLAT.map((c) => (c === oldName ? newName : c));
    const nextSubcats = {};
    Object.keys(SUB).forEach((group) => { nextSubcats[group] = (SUB[group] || []).map((c) => (c === oldName ? newName : c)); });
    return { flat: nextFlat, subcats: nextSubcats };
  }

  function startRename(cat) { setEditingCat(cat); setEditValue(cat); }

  function confirmRename(oldName) {
    const trimmed = editValue.trim();
    setEditingCat(null);
    if (!trimmed || trimmed === oldName) return;
    if (FLAT.includes(trimmed)) { alert('Já existe uma categoria chamada "' + trimmed + '".'); return; }
    persistCategoryConfig(renameConfig(oldName, trimmed));
    const affected = products.filter((p) => p.subcategory === oldName);
    if (affected.length > 0) { persistProducts(products.map((p) => (p.subcategory === oldName ? { ...p, subcategory: trimmed } : p))); }
  }

  function deleteCategory(cat) {
    const count = products.filter((p) => p.subcategory === cat).length;
    if (count > 0) { alert('Essa categoria tem ' + count + ' produto(s) cadastrado(s). Mova ou exclua esses produtos primeiro.'); return; }
    if (!confirm('Excluir a categoria "' + cat + '"?')) return;
    const nextFlat = FLAT.filter((c) => c !== cat);
    const nextSubcats = {};
    Object.keys(SUB).forEach((group) => { nextSubcats[group] = (SUB[group] || []).filter((c) => c !== cat); });
    persistCategoryConfig({ flat: nextFlat, subcats: nextSubcats });
  }

  async function handleCatPhoto(cat, file) {
    if (!file) return;
    setUploadingCat(cat);
    try {
      const dataUrl = await resizeImageFile(file, 700, 0.8);
      await persistCategoryImage(cat, dataUrl);
    } catch (err) { alert("Não consegui carregar essa imagem."); }
    setUploadingCat(null);
  }

  return (
    <div className="space-y-3">
      <p className="text-xs" style={{ color: C.gray }}>Use as setas pra mudar a ordem, o lápis pra renomear, a lixeira pra excluir, ou a foto pra escolher uma imagem da categoria.</p>
      <div className="space-y-1">
        {FLAT.map((cat, i) => (
          <div key={cat} className="flex items-center justify-between rounded-lg p-2 gap-2" style={{ background: C.cream, border: `1px solid ${C.line}` }}>
            <button onClick={() => fileInputs.current[cat]?.click()} className="shrink-0 rounded-lg overflow-hidden" style={{ width: 40, height: 40, border: `1px solid ${C.line}`, background: "#fff" }}>
              {uploadingCat === cat ? <div className="w-full h-full flex items-center justify-center text-[9px]">...</div> : categoryImages?.[cat] ? <img src={categoryImages[cat]} alt={cat} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={16} style={{ color: C.gray }} /></div>}
            </button>
            <input ref={(el) => (fileInputs.current[cat] = el)} type="file" accept="image/*" className="hidden" onChange={(e) => handleCatPhoto(cat, e.target.files?.[0])} />
            {editingCat === cat ? (
              <input autoFocus value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") confirmRename(cat); if (e.key === "Escape") setEditingCat(null); }} onBlur={() => confirmRename(cat)} className="text-sm font-bold flex-1 min-w-0 px-2 py-1 rounded outline-none" style={{ border: `1px solid ${C.red}`, color: C.ink }} />
            ) : (
              <span className="text-sm font-bold flex-1 min-w-0 truncate" style={{ color: C.ink }}>{cat}</span>
            )}
            <div className="flex gap-1 shrink-0">
              <button onClick={() => move(i, -1)} disabled={i === 0} className="text-xs font-bold px-2 py-1 rounded-lg disabled:opacity-30" style={{ border: `1px solid ${C.line}` }}>▲</button>
              <button onClick={() => move(i, 1)} disabled={i === FLAT.length - 1} className="text-xs font-bold px-2 py-1 rounded-lg disabled:opacity-30" style={{ border: `1px solid ${C.line}` }}>▼</button>
              <button onClick={() => startRename(cat)} className="p-1.5 rounded-lg" style={{ border: `1px solid ${C.line}` }}><Pencil size={14} /></button>
              <button onClick={() => deleteCategory(cat)} className="p-1.5 rounded-lg" style={{ border: `1px solid ${C.line}`, color: C.redDeep }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductForm({ initial, onSave, onCancel, categoryConfig, addCategory }) {
  const SUB = categoryConfig?.subcats || SUBCATS;
  const [name, setName] = useState(initial?.name || "");
  const [group, setGroup] = useState(initial?.group || "Salgados");
  const [subcategory, setSubcategory] = useState(initial?.subcategory || (SUB["Salgados"][0]));
  const [price, setPrice] = useState(initial?.price ?? "");
  const [description, setDescription] = useState(initial?.description || "");
  const [ingredients, setIngredients] = useState(initial?.ingredients || "");
  const [featured, setFeatured] = useState(initial?.featured || false);
  const [image, setImage] = useState(initial?.image || DEFAULT_IMAGE);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const subOptions = group === "Bebidas" ? ["Bebidas"] : (SUB[group] || []);

  function handleCreateCategory() {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    addCategory(group, trimmed);
    setSubcategory(trimmed);
    setNewCategoryName("");
    setCreatingCategory(false);
  }

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const dataUrl = await resizeImageFile(file);
      setImage(dataUrl);
    } catch (err) { setUploadError("Não consegui carregar essa imagem."); }
    setUploading(false);
  }

  return (
    <div className="rounded-xl p-4 space-y-2" style={{ background: C.cream, border: `1px solid ${C.line}` }}>
      <div className="flex items-center gap-3">
        <img src={image} alt="" className="rounded-lg object-cover" style={{ width: 56, height: 56, border: `1px solid ${C.line}` }} />
        <div className="flex-1">
          <label className="flex items-center justify-center gap-1 text-xs font-bold px-3 py-2 rounded-full cursor-pointer" style={{ border: `1px solid ${C.line}`, color: C.ink, background: "#fff", maxWidth: 200 }}>
            <Upload size={13} /> {uploading ? "Carregando..." : "Selecionar arquivo"}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} className="hidden" />
          </label>
          {uploadError && <p className="text-[10px] mt-1 font-bold" style={{ color: C.redDeep }}>{uploadError}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do produto" className="p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preço" type="number" step="0.01" className="p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
        <select value={group} onChange={(e) => { setGroup(e.target.value); setSubcategory((SUB[e.target.value] || ["Bebidas"])[0]); setCreatingCategory(false); }} className="p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }}>
          <option value="Salgados">Salgados</option>
          <option value="Doces">Doces</option>
          <option value="Bebidas">Bebidas</option>
        </select>
        {group !== "Bebidas" && !creatingCategory ? (
          <select value={subcategory} onChange={(e) => { if (e.target.value === "__new__") { setCreatingCategory(true); } else { setSubcategory(e.target.value); } }} className="p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }}>
            {subOptions.map((s) => (<option key={s} value={s}>{s}</option>))}
            <option value="__new__">+ Criar nova categoria...</option>
          </select>
        ) : group !== "Bebidas" ? (
          <div className="flex gap-1">
            <input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Nome da nova categoria" autoFocus className="flex-1 p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
            <button type="button" onClick={handleCreateCategory} disabled={!newCategoryName.trim()} className="text-xs font-bold px-3 rounded-lg disabled:opacity-50" style={{ background: C.red, color: "#fff" }}>Criar</button>
            <button type="button" onClick={() => { setCreatingCategory(false); setNewCategoryName(""); }} className="text-xs font-bold px-3 rounded-lg" style={{ border: `1px solid ${C.line}` }}>X</button>
          </div>
        ) : (
          <select value="Bebidas" disabled className="p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }}><option value="Bebidas">Bebidas</option></select>
        )}
      </div>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição (opcional)" className="w-full p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
      <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredientes (opcional)" className="w-full p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
      <label className="flex items-center gap-1 text-xs">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} /> Destacar em Lançamentos
      </label>
      <div className="flex gap-2">
        <button onClick={() => onSave({ name: name.trim(), group, subcategory, price: parseFloat(price) || 0, description: description.trim(), ingredients: ingredients.trim(), featured, image })} disabled={!name.trim() || price === ""} className="text-xs font-bold px-3 py-2 rounded-full disabled:opacity-50" style={{ background: C.red, color: "#fff" }}>Salvar</button>
        <button onClick={onCancel} className="text-xs font-bold px-3 py-2 rounded-full" style={{ border: `1px solid ${C.line}` }}>Cancelar</button>
      </div>
    </div>
  );
}

function AdminNeighborhoods({ settings, persistSettings }) {
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  function addNeighborhood() {
    if (!name.trim() || fee === "") return;
    persistSettings({ ...settings, neighborhoods: [...settings.neighborhoods, { id: uid("b"), name: name.trim(), fee: parseFloat(fee) || 0 }] });
    setName(""); setFee("");
  }
  function updateNeighborhood(id, patch) { persistSettings({ ...settings, neighborhoods: settings.neighborhoods.map((n) => (n.id === id ? { ...n, ...patch } : n)) }); }
  function removeNeighborhood(id) { persistSettings({ ...settings, neighborhoods: settings.neighborhoods.filter((n) => n.id !== id) }); }
  return (
    <div className="space-y-4">
      <div className="rounded-xl p-4" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
        <p className="text-xs font-bold mb-2" style={{ color: C.gray }}>Chave Pix exibida ao cliente</p>
        <input value={settings.pixKey} onChange={(e) => persistSettings({ ...settings, pixKey: e.target.value })} className="w-full p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
      </div>
      <div className="space-y-2">
        {settings.neighborhoods.map((n) => (
          <div key={n.id} className="flex items-center gap-2 rounded-xl p-3" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
            <input value={n.name} onChange={(e) => updateNeighborhood(n.id, { name: e.target.value })} className="flex-1 p-2 rounded-lg text-sm" style={{ border: `1px solid ${C.line}` }} />
            <input type="number" step="0.01" value={n.fee} onChange={(e) => updateNeighborhood(n.id, { fee: parseFloat(e.target.value) || 0 })} className="w-24 p-2 rounded-lg text-sm" style={{ border: `1px solid ${C.line}` }} />
            <button onClick={() => removeNeighborhood(n.id)} className="p-1" style={{ color: C.redDeep }}><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Novo bairro" className="flex-1 p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
        <input type="number" step="0.01" value={fee} onChange={(e) => setFee(e.target.value)} placeholder="Taxa" className="w-24 p-2 rounded-lg" style={{ border: `1px solid ${C.line}` }} />
        <button onClick={addNeighborhood} className="px-3 rounded-lg font-bold text-xs" style={{ background: C.ink, color: "#fff" }}>Adicionar</button>
      </div>
    </div>
  );
}

function AdminPrintMenu({ products, settings, persistSettings, categoryConfig, categoryImages }) {
  const [instagram, setInstagram] = useState(settings.instagram || "");
  const FLAT = categoryConfig?.flat || FLAT_CATEGORIES;
  function saveInstagram() { persistSettings({ ...settings, instagram: instagram.trim() }); }
  const groups = FLAT.filter((c) => c !== "Lançamentos").map((cat) => ({ cat, items: products.filter((p) => p.active && p.subcategory === cat).slice().sort((a, b) => a.name.localeCompare(b.name, "pt-BR")) })).filter((g) => g.items.length > 0);
  return (
    <div className="space-y-4">
      <div className="no-print space-y-3 rounded-xl p-4" style={{ background: C.cream, border: `1px solid ${C.line}` }}>
        <p className="text-sm" style={{ color: C.ink }}>Gera um cardápio pronto pra imprimir (ou salvar como PDF).</p>
        <div>
          <label className="text-xs font-bold" style={{ color: C.ink }}>Instagram (opcional)</label>
          <input value={instagram} onChange={(e) => setInstagram(e.target.value)} onBlur={saveInstagram} placeholder="@ocozinheirodeouro" className="w-full text-sm rounded-lg p-2 mt-1" style={{ border: `1px solid ${C.line}` }} />
        </div>
        <button onClick={() => window.print()} className="text-sm font-bold px-4 py-2 rounded-full" style={{ background: C.red, color: "#fff" }}>Imprimir / Salvar como PDF</button>
      </div>
      <div className="print-area">
        <style>{`
          @media print {
            @page { size: A4; margin: 12mm; }
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; top: 0; left: 0; width: 100%; }
            .print-page { break-after: page; }
            .print-page:last-child { break-after: auto; }
            .menu-flow { column-count: 2; column-gap: 10mm; column-fill: auto; }
            .category-block { break-inside: avoid-column; margin-bottom: 5mm; }
            .print-item { break-inside: avoid; }
          }
          @media screen {
            .print-area { border: 1px dashed ${C.line}; padding: 12px; margin-top: 12px; }
            .print-page + .print-page { border-top: 2px dashed ${C.line}; margin-top: 16px; padding-top: 16px; }
            .menu-flow { columns: 2 320px; column-gap: 24px; }
            .category-block { break-inside: avoid-column; margin-bottom: 18px; }
          }
          .category-title { display: flex; align-items: center; gap: 8px; background: linear-gradient(135deg, ${C.red}, ${C.redDeep}); color: #fff; border-radius: 8px; padding: 6px 10px 6px 6px; margin-bottom: 8px; box-shadow: 0 0 0 2px ${C.gold}; }
          .category-title img { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 2px solid ${C.goldLight}; flex-shrink: 0; }
          .category-title span { font-weight: 800; font-size: 1rem; letter-spacing: 0.03em; text-transform: uppercase; }
        `}</style>
        <div className="print-page flex flex-col items-center justify-center text-center" style={{ minHeight: "70vh" }}>
          <img src={DEFAULT_IMAGE} alt="Logo" style={{ width: 260, height: 260, borderRadius: "50%", border: `4px solid ${C.red}` }} />
          <h1 className="text-3xl font-extrabold mt-6" style={{ color: C.ink }}>{settings.storeName || "O Cozinheiro de Ouro"}</h1>
          <p className="text-lg mt-2" style={{ color: C.gray }}>Cardápio</p>
        </div>
        <div className="print-page menu-flow">
          {groups.map((g) => (
            <div key={g.cat} className="category-block">
              <div className="category-title"><img src={categoryImages?.[g.cat] || DEFAULT_IMAGE} alt={g.cat} /><span>{g.cat}</span></div>
              <div className="space-y-2 mt-1">
                {g.items.map((p) => (
                  <div key={p.id} className="print-item pb-1.5 mb-1.5" style={{ borderBottom: `1px solid ${C.line}` }}>
                    <div className="flex justify-between gap-2">
                      <p className="font-bold text-sm" style={{ color: C.ink }}>{p.name}</p>
                      <p className="font-bold text-sm shrink-0" style={{ color: C.ink }}>{money(p.price)}</p>
                    </div>
                    {p.description && <p className="text-xs" style={{ color: C.gray }}>{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="print-page flex flex-col items-center justify-center text-center" style={{ minHeight: "70vh" }}>
          <img src={DEFAULT_IMAGE} alt="Logo" style={{ width: 100, height: 100, borderRadius: "50%", border: `2px solid ${C.red}` }} />
          <h2 className="text-2xl font-extrabold mt-4" style={{ color: C.ink }}>Fale com a gente</h2>
          <div className="mt-4 space-y-2 text-base" style={{ color: C.ink }}>
            {settings.whatsapp && <p>📱 WhatsApp: {formatPhone(settings.whatsapp)}</p>}
            {instagram && <p>📷 Instagram: {instagram.startsWith("@") ? instagram : "@" + instagram}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminHours({ settings, persistSettings }) {
  function updateDay(day, patch) { persistSettings({ ...settings, hours: { ...settings.hours, [day]: { ...settings.hours[day], ...patch } } }); }
  function setOverride(v) { persistSettings({ ...settings, manualOverride: v }); }
  const open = isStoreOpenNow(settings);
  const now = new Date();
  const todayCfg = settings.hours[now.getDay()];
  return (
    <div className="space-y-6">
      <div className="rounded-xl p-4" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
        <p className="text-xs font-bold mb-2" style={{ color: C.gray }}>Status agora: <span style={{ color: open ? "#1E8E4A" : C.redDeep }}>{open ? "Aberto" : "Fechado"}</span></p>
        <p className="text-[11px] mb-3" style={{ color: C.gray }}>
          Modo: <strong>{settings.manualOverride === "auto" ? "Automático" : settings.manualOverride === "open" ? "Forçado aberto" : "Forçado fechado"}</strong>
          {" · "}Agora é <strong>{DAY_NAMES[now.getDay()]}, {now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</strong>
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
            <input value={settings.prepTime?.standard || ""} onChange={(e) => persistSettings({ ...settings, prepTime: { ...settings.prepTime, standard: e.target.value } })} className="w-full p-2 rounded-lg text-sm" style={{ border: `1px solid ${C.line}` }} />
          </div>
          <div>
            <label className="text-[11px]" style={{ color: C.gray }}>Sexta e sábado</label>
            <input value={settings.prepTime?.weekend || ""} onChange={(e) => persistSettings({ ...settings, prepTime: { ...settings.prepTime, weekend: e.target.value } })} className="w-full p-2 rounded-lg text-sm" style={{ border: `1px solid ${C.line}` }} />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {DAY_NAMES.map((dn, idx) => {
          const cfg = settings.hours[idx];
          return (
            <div key={idx} className="flex items-center gap-2 rounded-xl p-3 flex-wrap" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
              <label className="flex items-center gap-1 text-xs font-bold w-28">
                <input type="checkbox" checked={cfg.enabled} onChange={(e) => updateDay(idx, { enabled: e.target.checked })} /> {dn}
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
