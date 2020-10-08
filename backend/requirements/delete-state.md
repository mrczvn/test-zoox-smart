# Deletar Estado

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **DELETE** na rota **/api/state/:{state_id}**
2. ✅ Valida o parâmetro **state_id**
3. ✅ **Deleta** o Estado informado.
4. ✅ Retorna **204**, sem dados

> ## Exceções

1. ✅ Retorna erro **403** se o **{state_id}** passado na URL for inválido
2. ✅ Retorna erro **500** se der erro ao tentar deletar o Estado
