using Server.db;
using Server.DTOs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using System.Web.Http.Cors;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Server.Token;
using Server.DTOs.ViewModels;
using Server.Models.ViewModels;

namespace Server.Controllers
{
    [EnableCors("http://localhost:4200", "*", "*")]
    [RoutePrefix("api/EstatisticaViewModel")]
    public class EstatisticaController : Controlador
    {
        public EstatisticaController() : base()
        {
        }

        public EstatisticaController(DatabaseContext context) : base(context)
        {
        }

        // localhost:51839/api/Estatistica
        [TokenAuthorization]
        [HttpGet]
        public EstatisticaViewModelDto GetEstatistica(DateTime dtEmbarque, DateTime dtDesembarque)
        {
            var embarcacoes = _context.Embarcacoes.ToList().Select(Mapper.Map<Embarcacao, EmbarcacaoDto>);

            var filtro = embarcacoes.Where(emb => emb.DataEmbarque >= dtEmbarque && emb.DataDesembarque <= dtDesembarque);

            EstatisticaViewModelDto estatisticaDto = new EstatisticaViewModelDto();

            estatisticaDto.dataFim = dtDesembarque;
            estatisticaDto.dataInicio = dtEmbarque;
            Dictionary<string, int> estatisticas = new Dictionary<string, int>();

            foreach (var embarcacao in filtro)
            {
                var key = embarcacao.Usuario.empresa.ToUpper().TrimEnd().TrimStart();

                if (!estatisticas.ContainsKey(key))
                    estatisticas.Add(key, 1);
                else
                    estatisticas[key] += 1;
            }

            estatisticaDto.empresas = new List<string>();
            estatisticaDto.numeroEmbarcados = new List<int>();

            foreach (var item in estatisticas)
            {
                estatisticaDto.empresas.Add(item.Key);
                estatisticaDto.numeroEmbarcados.Add(item.Value);
            }

            return estatisticaDto;
        }           
    }
}
