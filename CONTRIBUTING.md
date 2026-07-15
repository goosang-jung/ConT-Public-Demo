# Contributing to ConT Public Demo

Thank you for interest in ConT! We welcome feedback, bug reports, feature suggestions, and documentation improvements.

---

## How Can You Help?

### 🐛 Report Bugs
Found an issue? Please open a GitHub Issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment (OS, Node version, browser)

### 📝 Improve Documentation
- Spot a typo or unclear explanation?
- Suggest a new guide or tutorial
- Improve architecture diagrams
- Add examples or use cases

### 💡 Suggest Features
- Feature requests welcome!
- Describe the use case
- Explain the benefit
- Note: This is a **demo**, not production

### ❓ Ask Questions
- Confused about a concept?
- How does X work?
- Post a GitHub Issue with tag `[question]`

---

## Before Contributing

### License Agreement
By contributing, you agree that:
- ✅ Your contribution falls under the [LICENSE](LICENSE)
- ✅ You have the right to contribute the code
- ✅ Your contribution is original work (or properly licensed)

### Code of Conduct
Please review and follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## Contribution Guidelines

### ✅ We Accept
- 📝 Documentation improvements
- 🐛 Bug reports
- 💬 Feature suggestions
- 📚 Example scenarios
- 🎨 UI/UX improvements
- ♻️ Refactoring for clarity
- ✅ Test improvements

### ❌ We Don't Accept (This is a Demo)
- ❌ Production algorithm implementations
- ❌ Real customer data or datasets
- ❌ Model weights or trained models
- ❌ Solver integrations (proprietary)
- ❌ Changes to security policies without discussion
- ❌ Features that violate [LICENSE](LICENSE)

---

## Development Workflow

### 1. Fork & Clone
```bash
git clone https://github.com/goosang-jung/ConT-Public-Demo.git
cd ConT-Public-Demo
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
# or
git checkout -b docs/your-doc-improvement
```

### 3. Make Changes
- Follow existing code style
- Add tests if applicable
- Update documentation
- Keep commits atomic and descriptive

### 4. Test Locally
```bash
npm install
npm run build
npm run test
npm run lint
```

### 5. Commit & Push
```bash
git commit -m "feat: add new feature description"
git push origin your-branch-name
```

### 6. Open Pull Request
- Title: Clear and descriptive
- Description: Explain the "why"
- Link related issues
- Request review if needed

---

## Code Style Guide

### JavaScript/TypeScript
- Use **Prettier** for formatting: `npm run format`
- Use **ESLint** for linting: `npm run lint`
- Use **TypeScript strict mode**
- Use meaningful variable names
- Add comments for complex logic

### Python
- Follow **PEP 8** style guide
- Use `black` for formatting
- Use `mypy` for type checking
- Add docstrings to functions

### Markdown
- Use clear headings
- Include code examples
- Link to related documentation
- Keep lines under 100 characters

---

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation change
- `style`: Code style (no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Test addition/modification
- `chore`: Build, dependencies, tooling

### Examples
```
feat(demo): add hybrid bonding scenario
fix(api): correct synthetic data response format
docs(guide): add setup instructions for Windows
style(components): apply consistent spacing
```

---

## Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

### Coverage Report
```bash
npm run test:coverage
```

**All tests must pass before submitting a PR.**

---

## Documentation

### Updating Docs
- Edit `.md` files in `docs/` folder
- Keep documentation in sync with code
- Update examples when behavior changes
- Add new guides for new features

### Adding Examples
- Place example files in `examples/` folder
- Include `README.md` explaining the example
- Use synthetic data with clear markers
- Add comments explaining key concepts

---

## Review Process

1. **Automated Checks**
   - Linting passes ✅
   - Tests pass ✅
   - Build succeeds ✅
   - No security vulnerabilities ✅

2. **Human Review**
   - Code quality review
   - Functionality verification
   - Documentation check
   - Security audit

3. **Approval & Merge**
   - Maintainer approval required
   - No outstanding review comments
   - All checks passing

---

## Communication

### Discord / Slack
- 💬 [Conception Discord](https://discord.gg/conception)
- Available for questions and discussions

### GitHub Issues
- 🐛 Bug reports
- 💡 Feature suggestions
- ❓ Questions

### Email
- 📧 Questions: contact@conception.ai
- 🔒 Security issues: security@conception.ai

---

## Contributor Recognition

We thank our contributors! 🙌

Contributors are recognized in:
- README.md (special contributors)
- CHANGELOG.md
- Release notes

---

## FAQ

**Q: Can I add production algorithms?**  
A: No. This is a demo repository. Production code stays in the private repository.

**Q: Can I use real customer data?**  
A: No. All data must be synthetic and clearly marked.

**Q: Can I modify the license?**  
A: No. License changes require approval from Conception leadership.

**Q: How long does review take?**  
A: Typically 2-5 business days for small PRs, longer for complex changes.

**Q: What if my PR is rejected?**  
A: We'll explain why and provide guidance for improvements.

---

## License

By contributing, you agree your contribution is licensed under the [LICENSE](LICENSE) terms.

---

## Thank You!

Thank you for making ConT better. Your contributions help us build a better platform. 🚀

---

**Last Updated**: 2026-07-15  
**Version**: 1.0
