# Security Boundary: Public Demo vs Production ConT

**What's in this demo | What's not | Why | What to expect in production**

---

## Executive Summary

This public demo showcases **ConT concepts and workflow**.

It does **NOT** include:
- ❌ Production algorithms or code
- ❌ Real customer data
- ❌ Model weights or trained models
- ❌ Commercial solver integrations
- ❌ Enterprise security features

For production use, you'll get:
- ✅ Full Hidden Physics Reconstruction
- ✅ Multi-solver orchestration
- ✅ Real-time performance
- ✅ Enterprise-grade security
- ✅ Compliance & audit trails
- ✅ Commercial support

---

## 1. Data: What's Included & Excluded

### Public Demo Data (Synthetic Only)

| Data Type | Status | Example |
|-----------|--------|---------|
| **Synthetic Observations** | ✅ Included | Thermal images, process params |
| **Synthetic MPState** | ✅ Included | Stress fields, temperature gradients |
| **Synthetic Predictions** | ✅ Included | Warpage, void risk predictions |
| **Sample Evidence** | ✅ Included | Validation results (demo) |
| **Real Customer Data** | ❌ Excluded | Cannot include |
| **Real Measurements** | ❌ Excluded | Actual sensor data |
| **Production Datasets** | ❌ Excluded | Factory wafer data |
| **Model Weights** | ❌ Excluded | Trained neural networks |

### Data Markers

All demo data includes metadata:
```json
{
  "metadata": {
    "data_type": "synthetic_demo",
    "warning": "Synthetic Demo Data — Not for Production Decision",
    "production_valid": false,
    "confidence": 0.84,
    "customer": null,
    "real_data": false,
    "source": "generated_for_demonstration"
  }
}
```

**You should NOT:**
- ❌ Use demo predictions for real manufacturing decisions
- ❌ Assume synthetic data matches real physics
- ❌ Deploy this demo in production systems
- ❌ Trust results without validation

---

## 2. Algorithms: What's Included & Excluded

### Public Demo Algorithms (Simplified for Learning)

| Capability | Status | Implementation |
|-----------|--------|-----------------|
| **API Contracts** | ✅ Full | TypeScript interfaces |
| **Mock Reconstruction** | ✅ Included | Synthetic response generator |
| **What-if Interface** | ✅ Included | Parameter comparison UI |
| **Validation Logic** | ✅ Simplified | Demo acceptance criteria |
| **Evidence Format** | ✅ Included | JSON structure & templates |
| **Hidden Physics Reconstruction** | ❌ Excluded | Proprietary algorithm |
| **Inverse Problem Solver** | ❌ Excluded | Core intellectual property |
| **Physics-Informed Neural Networks** | ❌ Excluded | Trained models, code |
| **Multi-Physics Coupling** | ❌ Excluded | Solver orchestration |
| **Uncertainty Quantification** | ❌ Excluded | Probabilistic inference engine |

### Mock vs Real

```
Public Demo
├─ Observation (thermal image)
│   ↓
├─ Mock Reconstruction ← Returns pre-computed synthetic MPState
│   ↓
└─ Validation & Evidence

Production ConT
├─ Observation (real sensor data)
│   ↓
├─ Real Reconstruction ← Solves inverse physics in real-time
│   ↓ (involves proprietary algorithms, PINN, solver integration)
│
└─ Validation & Evidence
```

---

## 3. Model & Solver Integration

### Public Demo (No Actual Integration)

| Component | Status | Details |
|-----------|--------|---------|
| **FEA Solver (Ansys, Abaqus)** | ❌ No | Interface only |
| **CFD Solver (Fluent)** | ❌ No | Interface only |
| **Process Simulator** | ❌ No | Interface only |
| **Commercial AI Service** | ❌ No | No integration |
| **Model Weights** | ❌ No | Not included |
| **Training Data** | ❌ No | Not available |

### Production ConT

- ✅ **FEA Integration**: Ansys, Abaqus, custom solvers
- ✅ **CFD Integration**: Fluent, OpenFOAM, Comsol
- ✅ **Proprietary Solvers**: Conception's accelerated engines
- ✅ **Real-time Orchestration**: Solver-in-the-loop workflows
- ✅ **Multi-physics Coupling**: Thermal-electrical-mechanical
- ✅ **Model Weights**: Pre-trained PINN models
- ✅ **Continuous Learning**: Adapt to new data

---

## 4. Security & Authentication

### Public Demo (Development Mode)

| Security Aspect | Status | Details |
|-----------------|--------|---------|
| **Authentication** | ❌ None | Dev mode, no login |
| **Authorization** | ❌ None | Anyone can access |
| **Data Encryption** | ❌ No | HTTP OK for local |
| **Audit Logging** | ❌ Basic | Console logging only |
| **Access Control** | ❌ None | Single user (you) |
| **Secrets Management** | ✅ Good | No secrets included |
| **Dependency Scanning** | ✅ Yes | npm audit passing |

### Production ConT

- ✅ **SSO/OAuth 2.0**: Integration with customer identity
- ✅ **Role-Based Access Control** (RBAC): Engineer, Manager, Admin
- ✅ **Data Encryption**: TLS in-transit, encryption at-rest
- ✅ **Audit Logging**: Complete decision trail
- ✅ **Tenant Isolation**: Customer data separation
- ✅ **Compliance**: SOC2 Type II, ISO 27001
- ✅ **Secrets Rotation**: Automated credential management
- ✅ **Rate Limiting**: API throttling
- ✅ **DDoS Protection**: Enterprise firewall

---

## 5. Performance & Scalability

### Public Demo (Single User, Development)

| Aspect | Capability |
|--------|-----------|
| **Concurrent Users** | 1 (you) |
| **Request Latency** | ~500ms (mock) |
| **API Rate Limit** | Unlimited (dev) |
| **Database** | None (in-memory only) |
| **Caching** | None |
| **Scalability** | Not applicable |

### Production ConT (Enterprise Grade)

- ✅ **Multi-user**: 1000+ concurrent
- ✅ **Real-time Physics**: <1 sec for simple cases
- ✅ **Rate Limiting**: Configurable, per-tenant
- ✅ **Database**: Enterprise-grade (PostgreSQL + cache)
- ✅ **Caching**: Redis for frequent queries
- ✅ **Load Balancing**: Kubernetes, auto-scaling
- ✅ **CDN**: Global content delivery

---

## 6. Compliance & Regulatory

### Public Demo (None)

- ❌ No regulatory compliance
- ❌ Not auditable
- ❌ No SLAs
- ❌ No certification

### Production ConT

- ✅ **ISO 27001**: Information security
- ✅ **SOC2 Type II**: Security & availability
- ✅ **GDPR**: Customer data privacy
- ✅ **HIPAA** (if applicable): Healthcare data
- ✅ **FDA 21 CFR Part 11**: Electronic records (optional)
- ✅ **Audit Trails**: Full traceability
- ✅ **SLA**: 99.9% uptime
- ✅ **Disaster Recovery**: RTO/RPO commitments

---

## 7. Support & SLA

### Public Demo

- ❌ No support
- ❌ No SLA
- ❌ No guarantees
- ❌ Community-based only

### Production ConT

- ✅ **24/7 Support**: Dedicated support team
- ✅ **Response Time**: 1 hour critical, 4 hours high
- ✅ **99.9% Uptime SLA**: Guaranteed availability
- ✅ **Professional Services**: Integration, training, customization
- ✅ **Quarterly Business Reviews**: Performance analysis
- ✅ **Roadmap Influence**: Feature prioritization

---

## 8. Comparison Table: Public Demo vs Production

| Capability | Public Demo | Production |
|-----------|-----------|-----------|
| **Learning ConT Concepts** | ✅ Yes | ✅ Yes |
| **Understand Workflow** | ✅ Yes | ✅ Yes |
| **Try Interactive Demo** | ✅ Yes | ❌ NA |
| **Use for Evaluation** | ✅ Yes | ✅ Yes |
| **Production Decision** | ❌ No | ✅ Yes |
| **Real Reconstruction** | ❌ No | ✅ Yes |
| **Real Solver Integration** | ❌ No | ✅ Yes |
| **Real Customer Data** | ❌ No | ✅ Yes (authorized) |
| **Model Weights** | ❌ No | ✅ Yes |
| **Solver License** | ❌ No | ✅ Yes (paid) |
| **Enterprise Security** | ❌ No | ✅ Yes |
| **Compliance** | ❌ No | ✅ Yes (ISO/SOC2) |
| **SLA** | ❌ No | ✅ 99.9% uptime |
| **24/7 Support** | ❌ No | ✅ Yes |
| **Multi-tenant** | ❌ Single | ✅ Yes |
| **Scalability** | ❌ Dev | ✅ Enterprise |
| **Data Persistence** | ❌ No | ✅ Yes |
| **Audit Trail** | ❌ No | ✅ Yes |
| **Custom Integration** | ❌ No | ✅ Yes |
| **Training & Services** | ❌ No | ✅ Yes |

---

## 9. What NOT to Do with This Demo

### ❌ Production Use
- ❌ Don't use demo results for real manufacturing decisions
- ❌ Don't integrate with factory equipment
- ❌ Don't use demo data in quality systems

### ❌ Data Security
- ❌ Don't add real customer data
- ❌ Don't store actual measurements
- ❌ Don't commit API keys or credentials

### ❌ Intellectual Property
- ❌ Don't reverse-engineer algorithms
- ❌ Don't train models on demo code
- ❌ Don't claim this is production-grade

### ❌ Compliance
- ❌ Don't use for regulated decisions (FDA, ISO)
- ❌ Don't use as-is in quality management systems
- ❌ Don't use without proper validation

---

## 10. Path to Production

### If You're Interested in ConT

1. **Understand the Concepts**
   - Read [PRODUCT_OVERVIEW.md](PRODUCT_OVERVIEW.md)
   - Explore this demo
   - Review [CONCEPTS.md](CONCEPTS.md)

2. **Evaluate Your Use Case**
   - What manufacturing process?
   - What data do you have?
   - What are your goals?

3. **Request a Production Demo**
   - Contact: sales@conception.ai
   - Share your use case
   - Schedule 1:1 walkthrough

4. **Commercial Evaluation**
   - Access to real production system
   - Your data (in secure, isolated environment)
   - Custom scenario modeling
   - Performance benchmarking

5. **Pilot Program**
   - Dedicated support team
   - Integration assistance
   - Performance validation
   - ROI analysis

6. **Commercial License**
   - Multi-year agreement
   - Solver integration (Ansys, CFD, etc.)
   - Custom workflow development
   - 24/7 support SLA

---

## 11. FAQ

**Q: Can I use this demo for research?**  
A: Yes, for understanding ConT concepts and architecture.

**Q: Can I use demo predictions in my process?**  
A: No. Demo uses synthetic data, not real physics.

**Q: Where are the real algorithms?**  
A: In the production ConT system (private repository, commercial license).

**Q: Can I see the model weights?**  
A: No, they're proprietary. They're in the production system with licensing.

**Q: How do I know if production ConT is accurate?**  
A: Request a production demo with your own data.

**Q: What's the price?**  
A: Contact sales@conception.ai for custom pricing based on your use case.

---

## 12. Contact for Production Interest

### Sales & Licensing
📧 **sales@conception.ai**

### Technical Questions
📧 **contact@conception.ai**

### Security Issues
🔒 **security@conception.ai**

---

**Version**: 1.0  
**Last Updated**: 2026-07-15  
**Status**: Public Demo | Production Separate
