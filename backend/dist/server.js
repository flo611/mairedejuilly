"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route")); // Route pour l'authentification
const article_route_1 = __importDefault(require("./routes/article.route")); // Route pour les articles
const media_route_1 = __importDefault(require("./routes/media.route")); // Route pour les médias
const protected_route_1 = __importDefault(require("./routes/protected.route")); // Route protégée (si nécessaire)
const app = (0, express_1.default)();
// Appliquer CORS globalement à toutes les routes
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN, // Autorisez l'origine de votre front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autoriser les méthodes HTTP
    credentials: true, // Si vous utilisez des cookies ou des tokens dans les en-têtes Authorization
}));
app.use(express_1.default.json()); // Middleware JSON pour parsing
// Routes
app.use('/auth', auth_route_1.default); // Routes pour l'authentification
app.use('/api/articles', article_route_1.default); // Routes pour les articles
app.use('/api/media', media_route_1.default); // Routes pour les médias
// Si tu as des routes protégées qui nécessitent une authentification, tu peux les ajouter ici
app.use('/api/protected', protected_route_1.default);
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
