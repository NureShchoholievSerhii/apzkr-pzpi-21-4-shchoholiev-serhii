using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using IngredientsTrackerApi.Application.IServices;
using IngredientsTrackerApi.Application.IServices.Identity;
using IngredientsTrackerApi.Application.Models;
using IngredientsTrackerApi.Application.Models.Dto;
using IngredientsTrackerApi.Application.Models.Identity;
using IngredientsTrackerApi.Application.Models.UpdateDto;
using IngredientsTrackerApi.Application.Pagination;

namespace IngredientsTrackerApi.RestApi.Controllers;

[Route("users")]
public class UsersController(
    IUserManager userManager,
    IUsersService usersService) : ApiController
{
    private readonly IUserManager _userManager = userManager;

    private readonly IUsersService _usersService = usersService;

    [HttpPost("register")]
    public async Task<ActionResult<TokensModel>> RegisterAsync([FromBody] Register register, CancellationToken cancellationToken)
    {
        var tokens = await _userManager.RegisterAsync(register, cancellationToken);
        return Ok(tokens);
    }

    [HttpPost("login")]
    public async Task<ActionResult<TokensModel>> LoginAsync([FromBody] Login login, CancellationToken cancellationToken)
    {
        var tokens = await _userManager.LoginAsync(login, cancellationToken);
        return Ok(tokens);
    }

    [Authorize]
    [HttpGet("{username}")]
    public async Task<ActionResult<UserDto>> GetUserByUsernameAsync(string username, CancellationToken cancellationToken)
    {
        var user = await _usersService.GetUserByUsernameAsync(username, cancellationToken);
        return Ok(user);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<UpdateUserModel>> UpdateAsync([FromBody] UserUpdateDto userDto, CancellationToken cancellationToken)
    {
        var updatedUserModel = await _userManager.UpdateAsync(userDto, cancellationToken);
        return Ok(updatedUserModel);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<ActionResult<UserDto>> UpdateUserByAdminAsync(string id, [FromBody] UserUpdateDto userDto, CancellationToken cancellationToken)
    {
        var updatedUserDto = await _userManager.UpdateUserByAdminAsync(id, userDto, cancellationToken);
        return Ok(updatedUserDto);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("{userId}/roles/{roleName}")]
    public async Task<ActionResult<UserDto>> AddToRoleAsync(string roleName, string userId, CancellationToken cancellationToken)
    {
        var userDto = await _userManager.AddToRoleAsync(roleName, userId, cancellationToken);
        return Ok(userDto);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{userId}/roles/{roleName}")]
    public async Task<ActionResult<UserDto>> RemoveFromRoleAsync(string roleName, string userId, CancellationToken cancellationToken)
    {
        var userDto = await _userManager.RemoveFromRoleAsync(roleName, userId, cancellationToken);
        return Ok(userDto);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<PagedList<UserDto>>> GetUsersPageAsync([FromQuery] int pageNumber, [FromQuery] int pageSize, CancellationToken cancellationToken)
    {
        var users = await _usersService.GetUsersPageAsync(pageNumber, pageSize, cancellationToken);
        return Ok(users);
    }
}
