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

namespace Server.Controllers
{
    [EnableCors("http://localhost:4200", "*", "*")]
    [RoutePrefix("api/embarcacao")]
    public class EmbarcacaoController : Controlador
    {
        public EmbarcacaoController() : base()
        {
        }

        public EmbarcacaoController(DatabaseContext context) : base(context)
        {
        }

        // localhost:51839/api/Embarcacao
        [TokenAuthorization]
        [HttpGet]
        public IEnumerable<EmbarcacaoDto> GetEmbarcacao()
        {
            return _context.Embarcacoes.ToList().Select(Mapper.Map<Embarcacao, EmbarcacaoDto>);
        }

        // localhost:51839/api/Embarcacao/1
        [TokenAuthorization]
        [HttpGet]
        public IHttpActionResult GetEmbarcacao(int id)
        {
            var Embarcacao = _context.Embarcacoes.SingleOrDefault(u => u.ID == id);
            if (Embarcacao == null)
                return NotFound();

            return Ok(Mapper.Map<Embarcacao, EmbarcacaoDto>(Embarcacao));
        }

        [HttpPost]
        //localhost:51839/api/embarcacao/create
        [Route("create")]
        public IHttpActionResult CreateEmbarcacao(EmbarcacaoDto EmbarcacaoDto)
        {
            var user = _context.Users.SingleOrDefault(u => u.ID == EmbarcacaoDto.UserId);
            if (user == null)
                return NotFound();

            var Embarcacao = Mapper.Map<Embarcacao>(EmbarcacaoDto);
            Embarcacao.Usuario = user;

            //Embarcacao.DataDesembarque = Embarcacao.DataDesembarque.AddDays(1);
            //Embarcacao.DataEmbarque = Embarcacao.DataEmbarque.AddDays(1);
            //Embarcacao.DataFimFolga = Embarcacao.DataFimFolga.AddDays(1);
            //Embarcacao.DataInicioFolga = Embarcacao.DataInicioFolga.AddDays(1);

            _context.Embarcacoes.Add(Embarcacao);

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                return BadRequest();
            }


            EmbarcacaoDto.ID = Embarcacao.ID;
            return Created(new Uri(Request.RequestUri + "/" + Embarcacao.ID), EmbarcacaoDto);
        }

        [HttpPut]
        //localhost:51839/api/Embarcacao/1
        [TokenAuthorization]
        public IHttpActionResult UpdateEmbarcacao(int id, EmbarcacaoDto EmbarcacaoDto)
        {
            if (EmbarcacaoDto == null || id == 0)
                return BadRequest();

            //EmbarcacaoDto.DataDesembarque = EmbarcacaoDto.DataDesembarque.AddDays(1);
            //EmbarcacaoDto.DataEmbarque = EmbarcacaoDto.DataEmbarque.AddDays(1);
            //EmbarcacaoDto.DataFimFolga = EmbarcacaoDto.DataFimFolga.AddDays(1);
            //EmbarcacaoDto.DataInicioFolga = EmbarcacaoDto.DataInicioFolga.AddDays(1);

            var user = _context.Users.SingleOrDefault(u => u.ID == EmbarcacaoDto.UserId);
            if (user == null)
                return NotFound();

            var EmbarcacaoInDb = _context.Embarcacoes.SingleOrDefault(u => u.ID == id);

            if (EmbarcacaoInDb == null)
                return NotFound();            

            Mapper.Map<EmbarcacaoDto, Embarcacao>(EmbarcacaoDto, EmbarcacaoInDb);
            EmbarcacaoInDb.Usuario = user;

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
            return Ok(Mapper.Map<Embarcacao, EmbarcacaoDto>(EmbarcacaoInDb));
        }

        [HttpDelete]
        //localhost:51839/api/Embarcacao/1
        [TokenAuthorization]
        public IHttpActionResult DeleteEmbarcacao(int id)
        {
            var EmbarcacaoInDb = _context.Embarcacoes.SingleOrDefault(u => u.ID == id);
            if (EmbarcacaoInDb == null)
                return NotFound();

            _context.Embarcacoes.Remove(EmbarcacaoInDb);
            try
            {
                _context.SaveChanges();
            }
            catch
            {
                return BadRequest();
            }
            return Ok(Mapper.Map<Embarcacao, EmbarcacaoDto>(EmbarcacaoInDb));
        }                
    }
}
