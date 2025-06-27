# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b2463ad4-12d6-413c-be39-582d65a24e57

## Dark Mode

This application includes a comprehensive dark mode theme system built with `next-themes` and Tailwind CSS.

### Features

- **Theme Toggle**: Click the sun/moon icon in the top-right corner to switch between light and dark themes
- **Persistent Storage**: Your theme preference is automatically saved to localStorage
- **Accessibility**: Proper contrast ratios and focus states for both themes
- **System Integration**: Uses CSS custom properties for seamless theme switching

### How it Works

The theme system uses:
- `next-themes` for theme management and persistence
- Tailwind's `dark:` prefix for theme-specific styles
- CSS custom properties (design tokens) for consistent theming
- Automatic class injection on the `<html>` element

### Extending Color Tokens

To add new theme-aware colors:

1. **Update Tailwind Config**: Add custom colors to `tailwind.config.ts`
2. **Use Design Tokens**: Reference existing tokens like `bg-background`, `text-foreground`, `border-border`
3. **Add Dark Variants**: Use `dark:` prefix for dark mode specific styles

Example:
```css
.my-component {
  @apply bg-card text-foreground border-border;
  @apply dark:bg-slate-800 dark:text-slate-100;
}
```

### Accessibility Notes

- All color combinations meet WCAG contrast requirements
- Focus indicators work in both light and dark modes
- Theme toggle includes proper ARIA labels and keyboard navigation

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b2463ad4-12d6-413c-be39-582d65a24e57) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b2463ad4-12d6-413c-be39-582d65a24e57) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
