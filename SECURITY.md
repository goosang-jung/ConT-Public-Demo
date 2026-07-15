# Security Policy

## Vulnerability Report

If you discover a **security vulnerability** in this repository, please report it responsibly.

### ⚠️ DO NOT

- ❌ Open a public GitHub Issue about security vulnerabilities
- ❌ Post vulnerability details on social media
- ❌ Share exploit code or proof-of-concept
- ❌ Attempt unauthorized access to Conception systems

### ✅ DO

- 📧 Email: **security@conception.ai**
- Include:
  - Description of the vulnerability
  - Steps to reproduce
  - Potential impact
  - Suggested fix (if you have one)

### Response Timeline

1. **Acknowledgment**: Within 24 hours
2. **Triage & Assessment**: Within 3 business days
3. **Fix & Release**: Varies by severity
4. **Public Disclosure**: Coordinated with reporter

---

## What This Demo Contains

### ✅ Safe (Demonstration Only)
- Synthetic data (clearly marked as "demo_data")
- Public API contracts
- Mock API server
- Example workflows
- Architecture diagrams
- UI showcase

### ⚠️ Not Included (For Security)
- Production algorithms
- Real customer data
- Model weights or trained models
- Commercial solver integrations
- API keys or credentials
- Database URLs or connection strings
- Customer names or sensitive information

---

## Data Privacy

### Synthetic Data Only
- All data in this demo is **100% synthetic**
- Generated for demonstration and education
- Contains NO real manufacturing data
- Marked with metadata: `"data_origin": "synthetic"`

### Example Metadata
```json
{
  "metadata": {
    "data_type": "synthetic_demo",
    "warning": "Synthetic Demo Data — Not for Production Decision",
    "production_valid": false,
    "confidence": 0.84,
    "customer": null,
    "real_data": false
  }
}
```

### How We Verify
✅ Automated secret scanning on every commit (gitleaks)  
✅ Dependency vulnerability scanning (npm audit, pip-audit)  
✅ Code review for hardcoded credentials  
✅ File size checks (no large model weights)  

---

## Using This Demo Safely

### ✅ Safe Practices
- ✅ Use the demo for learning and evaluation only
- ✅ Run locally on your own machine
- ✅ Disconnect from internet if working with sensitive info
- ✅ Don't integrate with real manufacturing systems
- ✅ Assume all outputs are for demonstration

### ❌ Unsafe Practices
- ❌ Use demo data in production decisions
- ❌ Trust demo results for manufacturing optimization
- ❌ Connect to real manufacturing equipment
- ❌ Assume synthetic outputs match real physics
- ❌ Use for critical safety decisions

---

## Demo vs Production ConT

| Feature | Public Demo | Commercial ConT |
|---------|------------|-----------------|
| **Data** | Synthetic | Real (authorized) |
| **Algorithms** | Mock | Production |
| **Model Weights** | ❌ None | ✅ Private |
| **Solver Integration** | Interface only | Full integration |
| **Accuracy** | Demo-level | Production-grade |
| **Validation** | Sample rules | Customer-specific |
| **Evidence** | Example format | Signed & audited |
| **Security** | Basic | Enterprise |

---

## Dependencies & Vulnerabilities

### Automated Scanning
This repository uses:
- **npm audit** — JavaScript dependency scanning
- **pip-audit** — Python dependency scanning
- **Renovate** — Automated dependency updates
- **GitHub Security Scanning** — Secret detection

### Current Status
- ✅ All critical vulnerabilities patched
- ✅ No known security issues
- ⚠️ See [CONTRIBUTING.md](CONTRIBUTING.md) to report issues

---

## Secure Development Practices

We follow:
- ✅ No hardcoded secrets
- ✅ No sensitive data in Git history
- ✅ .env files in .gitignore
- ✅ API keys in environment variables
- ✅ Regular dependency updates
- ✅ Code review for security

---

## Responsible Disclosure

Conception practices **responsible disclosure**:

1. **Report privately** to security@conception.ai
2. **Don't publish** until we've had time to fix
3. **Give us time** to develop and release a patch
4. **Coordinate timing** for simultaneous public disclosure
5. **Credit** security researchers appropriately

**We value your help** in keeping ConT secure.

---

## Legal

### Warranty Disclaimer
This demo is provided "AS IS" without warranty.
See [LICENSE](LICENSE) for full disclaimer.

### Liability
Conception is not liable for damages from security vulnerabilities.
Use this demo at your own risk.

### Compliance
This demo does NOT:
- Handle real customer data
- Comply with ISO, FDA, or industry standards (it's a showcase)
- Meet production-grade security requirements
- Support regulated use cases

For regulated or production use, contact sales@conception.ai.

---

## Questions?

- 🔒 Security Questions: **security@conception.ai**
- 💬 General Questions: **contact@conception.ai**
- 📧 Vulnerability Report: **security@conception.ai**

---

**Last Updated**: 2026-07-15  
**Version**: 1.0  
**Status**: Public Disclosure Policy Active
