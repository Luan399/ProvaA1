using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

app.MapGet("/", () => "Luan");

// Listar todas
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    var lista = ctx.Tarefas.ToList();
    return lista.Count == 0 ? Results.NotFound("Nenhuma tarefa encontrada") : Results.Ok(lista);
});

// Cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

// Alterar status
app.MapPut("/api/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    var tarefa = ctx.Tarefas.Find(id);
    if (tarefa is null) return Results.NotFound("Tarefa não encontrada");

    var status = (tarefa.Status ?? "").Trim().ToLowerInvariant();

    if (status == "não iniciada" || status == "nao iniciada" || status == "não iniciado" || status == "nao iniciado")
        tarefa.Status = "Em andamento";
    else if (status == "em andamento")
        tarefa.Status = "Concluída";

    ctx.SaveChanges();
    return Results.Ok(tarefa);
});

// Não concluídas
app.MapGet("/api/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) => {
    return Results.Ok(
        ctx.Tarefas.Where(x => x.Status != "Concluída").ToList()
    );
});


// Concluídas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx) => {
    return Results.Ok(
        ctx.Tarefas.Where(x => x.Status == "Concluída").ToList()
    );
});

app.UseCors("Acesso Total");
app.Run();