package main

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"

	"context"

	"github.com/labstack/echo/v4"
	traq "github.com/traPtitech/go-traq"
)

var (
	ErrNotFound = errors.New("Not Found")
	ErrNoChange = errors.New("No Change")
)

func generateEchoError(err error) error {
	if errors.Is(err, ErrNotFound) {
		return echo.NewHTTPError(http.StatusNotFound, "Not Found")
	} else if errors.Is(err, ErrNoChange) {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, "No Change")
	} else {
		log.Println(err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Internal Server Error")
	}
}

func NewTraqClient() (*traq.APIClient, context.Context) {
	client := traq.NewAPIClient(traq.NewConfiguration())
	auth := context.WithValue(context.Background(), traq.ContextAccessToken, os.Getenv("TRAQ_BOT_TOKEN"))

	return client, auth
}

func getFileDownloadHandler(c echo.Context) error {
	ctx := c.Request().Context()
	fileID := c.Param("id")
	thumbnail := c.QueryParam("thumbnail")

	file, res, err := GetFileDownload(ctx, fileID, thumbnail == "true")
	if err != nil {
		return generateEchoError(err)
	}
	defer file.Close()

	info, err := file.Stat()
	if err != nil {
		return generateEchoError(err)
	}

	c.Response().Header().Set(echo.HeaderContentType, res.Header.Get("Content-Type"))
	c.Response().Header().Set("Cache-Control", "private, max-age=31536000")
	http.ServeContent(c.Response(), c.Request(), info.Name(), info.ModTime(), file)
	return echo.NewHTTPError(http.StatusOK)
}

func GetFileDownload(ctx context.Context, fileId string, thumbnail bool) (*os.File, *http.Response, error) {
	client, auth := NewTraqClient()

	var file *os.File
	var res *http.Response
	var err error

	if thumbnail {
		file, res, err = client.FileAPI.GetThumbnailImage(auth, fileId).Execute()
	} else {
		file, res, err = client.FileAPI.GetFile(auth, fileId).Execute()
	}

	if err != nil {
		return nil, nil, err
	}

	if res.StatusCode != http.StatusOK {
		return nil, res, fmt.Errorf("failed in HTTP request:(status:%d %s)", res.StatusCode, res.Status)
	}

	return file, res, nil
}

func main() {
	e := echo.New()

	e.GET("/files/:id", getFileDownloadHandler)

	e.Logger.Fatal(e.Start(":8080"))
}
