# Modelagem de Domínio

Este repositório é um projeto de estudo sobre **Domain Driven Design (DDD)** e **Test Driven Development (TDD)**.

O foco está no backend, na pasta `backend/`, onde estão os exemplos de entidade, value objects, serviço de domínio, validações e testes.

## O que o projeto mostra

- **Value Objects**: `CPF`, `PeopleName`, `Id` e `CPFRegion` encapsulam regras do domínio.
- **Entidade**: `People` representa uma pessoa com identidade própria.
- **Serviço de domínio**: `ByRegion` agrupa pessoas por região do CPF.
- **TDD**: os testes ajudam a guiar a implementação e a validar o comportamento.
- **Tratamento de erros**: as validações retornam erros claros quando algo viola as regras do domínio.

## Como funciona

1. `People` monta a pessoa com `name` e `cpf`.
2. `PeopleName` valida o nome.
3. `CPF` valida o documento e descobre a região.
4. `ByRegion` agrupa as pessoas em um `Map<CPFRegion, People[]>`.

## Resumo

Este projeto serve como laboratório prático para entender, de forma simples, como modelar o domínio com DDD e validar o comportamento com TDD.

## Testes

```bash
cd backend
npm test
```

