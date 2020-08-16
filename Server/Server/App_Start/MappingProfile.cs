using AutoMapper;
using Server.DTOs;
using Server.DTOs.ViewModels;
using Server.Models;
using Server.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.App_Start
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            Mapper.CreateMap<User, UserDto>().ForMember(user => user.Password, opt => opt.Ignore());

            Mapper.CreateMap<UserDto, User>();

            Mapper.CreateMap<Embarcacao, EmbarcacaoDto>()
                .ForMember(dst => dst.Usuario, opt => opt.MapFrom(src => src.Usuario));

            Mapper.CreateMap<EmbarcacaoDto, Embarcacao>()
                .ForMember(dst => dst.Usuario, opt => opt.MapFrom(src => src.Usuario));

            Mapper.CreateMap<EstatisticaViewModel, EstatisticaViewModelDto>();

            Mapper.CreateMap<EstatisticaViewModelDto, EstatisticaViewModel>();

        }
    }
}