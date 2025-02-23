import "./bootstrap";
import "../css/app.css";
import "../scss/app.scss";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import "bootstrap";
import AppProvider from "@/contexts/AppProvider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
	title: (title) => `${title} - ${appName}`,
	resolve: (name) =>
		resolvePageComponent(
			`./Pages/${name}.tsx`,
			import.meta.glob("./Pages/**/*.tsx"),
		),
	setup({ el, App, props }) {
		const root = createRoot(el);
		root.render(
			<AppProvider>
				<App {...props} />
			</AppProvider>,
		);
	},
	progress: {
		color: "#4B5563",
	},
});
