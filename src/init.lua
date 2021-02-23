local exports = {}

if (game:GetService("RunService"):IsServer()) then
	exports.KnitServer = require(script.KnitServer)
else
	script.KnitServer:Destroy()
	exports.KnitClient = require(script.KnitClient)
end

local Util = script:WaitForChild("Util")
exports.Util = {
	Component = require(Util:WaitForChild("Component"));
	TableUtil = require(Util:WaitForChild("TableUtil"));
	Thread = require(Util:WaitForChild("Thread"));
}

return exports