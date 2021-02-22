local exports = {}

if (game:GetService("RunService"):IsServer()) then
	exports.KnitServer = require(script.KnitServer)
else
	script.KnitServer:Destroy()
	exports.KnitClient = require(script.KnitClient)
end

return exports