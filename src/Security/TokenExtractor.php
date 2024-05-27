<?php

namespace App\Security;


use Symfony\Component\Security\Http\AccessToken\AccessTokenExtractorInterface;
use Symfony\Component\HttpFoundation\Request;

class TokenExtractor implements AccessTokenExtractorInterface
{
    private string $headerName;

    public function __construct(string $headerName = 'Authorization')
    {
        $this->headerName = $headerName;
    }

    public function extractAccessToken(Request $request): ?string
    {
        $token = null;
        // Extract token from a custom header
        if ($request->headers->has($this->headerName)) {
            $authorizationHeader = $request->headers->get($this->headerName);

            // Check if the header is in the expected format (e.g., "Bearer TOKEN")
            if (0 === stripos($authorizationHeader, 'Bearer ')) {
                $token = substr($authorizationHeader, 7);
            }
        }
        // Alternatively, extract token from a query parameter (if needed)
        if ($request->query->has('token')) {
            $token = $request->query->get('token');
        }

        return $token;
    }
}
